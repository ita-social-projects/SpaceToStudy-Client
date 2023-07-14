import axios from 'axios'

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_PATH
})
