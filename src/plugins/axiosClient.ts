import axios, { AxiosInstance } from 'axios'

export const axiosClient: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_PATH as string
})
