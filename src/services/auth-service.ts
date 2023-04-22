import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs as Urls, URLs } from '~/constants/request'
import {
  GoogleAuthParams,
  LoginParams,
  LoginResponse,
  SignupParams,
  SignupRespornse
} from '~/types'

export const AuthService = {
  login: (userData: LoginParams): Promise<AxiosResponse<LoginResponse>> => {
    return axiosClient.post(URLs.auth.login, userData)
  },
  googleAuth: (
    userData: GoogleAuthParams
  ): Promise<AxiosResponse<LoginResponse>> => {
    return axiosClient.post(URLs.auth.googleAuth, userData)
  },
  signup: (userData: SignupParams): Promise<AxiosResponse<SignupRespornse>> => {
    return axiosClient.post(URLs.auth.signup, userData)
  },
  logout: (): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.auth.logout)
  },
  refresh: (): Promise<AxiosResponse<LoginResponse>> => {
    return axiosClient.get(URLs.auth.refresh)
  },
  confirmEmail: (confirmToken: string): Promise<AxiosResponse> => {
    const confirmUrl = `${Urls.auth.confirm}/${confirmToken}`
    return axiosClient.get(confirmUrl)
  },
  forgotPassword: (userEmail: string): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.auth.forgotPassword, userEmail)
  },
  resetPassword: (
    resetToken: string,
    newPassword: string
  ): Promise<AxiosResponse> => {
    const confirmUrl = `${Urls.auth.resetPassword}/${resetToken}`
    return axiosClient.patch(confirmUrl, newPassword)
  }
}
