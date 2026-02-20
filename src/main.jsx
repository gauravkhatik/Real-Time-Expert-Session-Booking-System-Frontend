import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ExpertList from './pages/ExpertList'
import ExpertDetail from './pages/ExpertDetail'
import MyBookings from './pages/MyBookings'
import './styles.css'

function App(){
  return (
    <BrowserRouter>
      <div className="app">
        <header>
          <Link to="/">Experts</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ExpertList/>} />
            <Route path="/experts/:id" element={<ExpertDetail/>} />
            <Route path="/my-bookings" element={<MyBookings/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(<App />)
