import axios from 'axios'

const baseURL = (import.meta.env.VITE_API_URL) ? import.meta.env.VITE_API_URL : '/api'

const api = axios.create({
  baseURL,
  timeout: 5000,
})

export default api
