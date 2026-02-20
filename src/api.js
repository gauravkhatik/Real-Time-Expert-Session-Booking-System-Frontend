import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://real-time-expert-session-booking-sy.vercel.app/api' });

export default API;
