import React, { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'

export default function ExpertList(){
  const [experts, setExperts] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=>{ fetchData() },[page, search, category])
  useEffect(()=>{ fetchCategories() },[])

  async function fetchCategories(){
    try{
      const res = await API.get('/experts/categories')
      setCategories(res.data.data || [])
    }catch(err){ console.error('failed to load categories', err) }
  }

  async function fetchData(){
    setLoading(true); setError(null)
    try{
      const res = await API.get('/experts', { params: { page, search, category } })
      setExperts(res.data.data)
    }catch(err){ setError(err.response?.data?.error || err.message) }
    setLoading(false)
  }

  return (
    <div className="container">
      <h2>Experts</h2>
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <input placeholder="Search name" value={search} onChange={e=>setSearch(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All Domains</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button className="btn" onClick={()=>{ setPage(1); fetchData() }}>Search</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div style={{color:'red'}}>{error}</div>}
      {experts.map(e=> (
        <div className="card" key={e._id}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>
              <h3><Link to={`/experts/${e._id}`}>{e.name}</Link></h3>
              <div>{e.category} • {e.experience} yrs • ⭐ {e.rating}</div>
            </div>
            <div>
              <Link to={`/experts/${e._id}`} className="btn">View</Link>
            </div>
          </div>
        </div>
      ))}
      <div style={{marginTop:12}}>
        <button onClick={()=>setPage(p=>Math.max(1,p-1))}>Prev</button>
        <span style={{margin:'0 8px'}}>Page {page}</span>
        <button onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}
