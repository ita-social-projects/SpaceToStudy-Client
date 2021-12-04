import axios from 'axios'

export const request = axios.create({
  baseURL: 'API_BASE_PATH'
})