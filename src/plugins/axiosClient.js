import axios from 'axios'

export const axiosClient = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_PATH
})

