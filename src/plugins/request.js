import axios from 'axios'

const API_BASE_PATH = 'http://localhost:8080'

export const request = axios.create({
  baseURL: API_BASE_PATH
})
