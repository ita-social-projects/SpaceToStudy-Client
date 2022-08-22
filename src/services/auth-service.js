import axios from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs as Urls, URLs } from '~/constants/request'

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_BASE_PATH
})

export const AuthService = {
  login: (userData) => {
    return axiosClient.post(URLs.auth.login, userData)
  },
  signup: (userData) => {
    return axiosClient.post(URLs.auth.signup, userData)
  },
  logout: () => {
    return axiosClient.post(URLs.auth.logout)
  },
  refresh: () => {
    return axiosInstance.get(URLs.auth.refresh)
  },
  confirmEmail: (confirmToken) => {
    const confirmUrl = `${Urls.auth.confirm}/${confirmToken}`
    return axiosInstance.get(confirmUrl)
  }
}
