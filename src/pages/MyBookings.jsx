import React, { useState } from 'react'
import API from '../api'

export default function MyBookings(){
  const [email, setEmail] = useState('')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetch(){
    setLoading(true); setError(null)
    try{
      const res = await API.get('/bookings', { params: { email } })
      setBookings(res.data.data)
    }catch(err){ setError(err.response?.data?.error || err.message) }
    setLoading(false)
  }

  return (
    <div className="container">
      <h2>My Bookings</h2>
      <div style={{display:'flex',gap:8}}>
        <input placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="btn" onClick={fetch}>Search</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {bookings.map(b=> (
        <div className="card" key={b._id}>
          <div><strong>{b.expert?.name || 'Expert'}</strong></div>
          <div>{b.date} {b.timeSlot}</div>
          <div>Status: {b.status}</div>
        </div>
      ))}
    </div>
  )
}
