import axios, { AxiosInstance } from 'axios'
import qs from 'qs'

export const axiosClient: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_API_BASE_PATH,
  paramsSerializer: (params) => {
    return encodeURI(qs.stringify(params, { encode: false }))
  }
})
