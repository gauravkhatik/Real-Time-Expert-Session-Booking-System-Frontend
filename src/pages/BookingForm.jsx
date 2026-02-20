import React, { useEffect, useState } from 'react'
import API from '../api'

export default function BookingForm({ expertId, onBooked }){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [timeSlot, setTimeSlot] = useState('')
  const [notes, setNotes] = useState('')
  const [slotsByDate, setSlotsByDate] = useState({})
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [msg, setMsg] = useState(null)

  useEffect(()=>{ fetchSlots() },[])

  async function fetchSlots(){ setLoadingSlots(true)
    try{ const res = await API.get(`/experts/${expertId}/slots`); setSlotsByDate(res.data.slotsByDate) }catch(e){}
    setLoadingSlots(false)
  }

  async function submit(e){ e.preventDefault(); setMsg(null)
    if (!name || !email || !date || !timeSlot){ setMsg('Please fill required fields'); return }
    try{
      await API.post('/bookings', { expert: expertId, name, email, phone, date, timeSlot, notes })
      setMsg('Booking successful')
      if (onBooked) onBooked()
    }catch(err){ setMsg(err.response?.data?.error || 'Booking failed') }
  }

  return (
    <div className="card">
      <h3>Book Session</h3>
      <form onSubmit={submit}>
        <div className="form-row"><input placeholder="Name*" value={name} onChange={e=>setName(e.target.value)} /></div>
        <div className="form-row"><input placeholder="Email*" value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="form-row"><input placeholder="Phone" value={phone} onChange={e=>setPhone(e.target.value)} /></div>
        <div className="form-row"><input type="date" value={date} onChange={e=>setDate(e.target.value)} /></div>
        <div className="form-row">
          <select value={timeSlot} onChange={e=>setTimeSlot(e.target.value)}>
            <option value="">Select time slot</option>
            {date && slotsByDate[date] && slotsByDate[date].map(s=> (
              <option key={s.time} value={s.time} disabled={!s.available}>{s.time} {s.available? '':'(booked)'}</option>
            ))}
          </select>
        </div>
        <div className="form-row"><textarea placeholder="Notes" value={notes} onChange={e=>setNotes(e.target.value)} /></div>
        <div className="form-row"><button className="btn" type="submit">Book</button></div>
        {msg && <div>{msg}</div>}
      </form>
    </div>
  )
}
