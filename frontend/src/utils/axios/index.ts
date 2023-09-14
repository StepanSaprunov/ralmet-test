import axios from 'axios'

const token = localStorage.getItem('token')

export const instanceAuth = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000',
  timeout: 1000,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});