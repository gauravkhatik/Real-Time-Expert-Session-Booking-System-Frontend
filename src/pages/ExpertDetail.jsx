import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'
import io from 'socket.io-client'
import BookingForm from './BookingForm'

let socket

export default function ExpertDetail(){
  const { id } = useParams()
  const [expert, setExpert] = useState(null)
  const [slotsByDate, setSlotsByDate] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{
    fetchExpert()
    fetchSlots()
    
    const ioUrl = import.meta.env.VITE_IO_URL || 'https://real-time-expert-session-booking-sy.vercel.app'
    if (ioUrl && typeof ioUrl === 'string') {
      socket = io(ioUrl, { reconnection: true })
      socket.on('connect', ()=>{ socket.emit('joinExpert', id) })
      socket.on('bookingCreated', (payload)=>{
        if (payload.expert === id){
          setSlotsByDate(prev=>{
            const copy = JSON.parse(JSON.stringify(prev))
            if (copy.slotsByDate && copy.slotsByDate[payload.date]){
              const s = copy.slotsByDate[payload.date].find(x=>x.time===payload.timeSlot)
              if (s) s.available = false
            }
            return copy
          })
        }
      })
      socket.on('error', (err)=>{ console.error('Socket error:', err) })
    }

    return ()=>{ if (socket) { socket.emit('leaveExpert', id); socket.disconnect() } }
  },[id])

  async function fetchExpert(){
    try{ const res = await API.get(`/experts/${id}`); setExpert(res.data) }catch(e){ setError('Failed to load expert') }
  }

  async function fetchSlots(){ setLoading(true); setError(null)
    try{ const res = await API.get(`/experts/${id}/slots`); setSlotsByDate(res.data) }catch(e){ setError('Failed to load slots') }
    setLoading(false)
  }

  return (
    <div className="container">
      {expert && (
        <div>
          <h2>{expert.name}</h2>
          <div>{expert.category} • {expert.experience} yrs • ⭐ {expert.rating}</div>
        </div>
      )}
      <h3>Available Slots</h3>
      {loading && <div>Loading slots...</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {slotsByDate && slotsByDate.slotsByDate && Object.keys(slotsByDate.slotsByDate).map(date=> (
        <div key={date} className="card">
          <h4>{date}</h4>
          <div className="slots">
            {slotsByDate.slotsByDate[date].map(s=> (
              <div key={s.time} className={`slot ${!s.available? 'booked':''}`}>{s.time}</div>
            ))}
          </div>
        </div>
      ))}

      <BookingForm expertId={id} onBooked={fetchSlots} />
    </div>
  )
}
