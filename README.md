# Real-Time-Expert-Session-Booking-System-Frontend

## 🏗️ Tech Stack

- React 18
- React Router v6
- Axios
- Socket.io-client
- Vite

---

## 📂 Project Structure

frontend/
├── src/
│ ├── pages/
│ ├── api.js
│ ├── main.jsx
│ └── App.jsx
└── package.json

---

## ⚙️ Features

Browse experts  
Search & filter by category  
View real-time available slots  
Book sessions  
Track booking history  
Real-time slot updates  
Clean SPA routing

---

## 🔧 Installation (Local Setup)

1️⃣ Install dependencies

```bash
npm install

2️⃣ Create .env file

VITE_API_URL=http://localhost:4000/api
VITE_IO_URL=http://localhost:4000

3️⃣ Run frontend

npm run dev

App runs at:

http://localhost:3000
🌍 Production Deployment (Vercel)

Set environment variables in Vercel:

VITE_API_URL=https://your-backend-url/api
VITE_IO_URL=https://your-backend-url

Then redeploy.

🖥️ Pages

Expert List
Displays paginated experts
Search by name
Filter by category
Expert Detail
Shows expert profile
Displays availability calendar
Real-time slot updates
My Bookings
Lookup bookings by email
Shows booking history and status

🔄 Application Flow

Browse experts
Select expert
Choose date & time
Book session
Real-time update for availability
View bookings
```
