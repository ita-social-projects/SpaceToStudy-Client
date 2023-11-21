import { AxiosResponse } from 'axios'

import { appApi } from '~/redux/apiSlice'
import { axiosClient } from '~/plugins/axiosClient'

import { createUrlPath } from '~/utils/helper-functions'
import { URLs } from '~/constants/request'
import {
  ApiMethodEnum,
  GoogleAuthParams,
  LoginParams,
  LoginResponse,
  SignupParams,
  SignupResponse
} from '~/types'

const { POST } = ApiMethodEnum

export const AuthService = {
  refresh: (): Promise<AxiosResponse<LoginResponse>> => {
    return axiosClient.get(URLs.auth.refresh)
  },
  confirmEmail: (confirmToken: string): Promise<AxiosResponse> => {
    const confirmUrl = createUrlPath(URLs.auth.confirm, confirmToken)
    return axiosClient.get(confirmUrl)
  },
  forgotPassword: (userEmail: string): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.auth.forgotPassword, userEmail)
  },
  resetPassword: (
    resetToken: string,
    newPassword: string
  ): Promise<AxiosResponse> => {
    const confirmUrl = createUrlPath(URLs.auth.resetPassword, resetToken)
    return axiosClient.patch(confirmUrl, newPassword)
  }
}

export const authService = appApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<SignupResponse, SignupParams>({
      query: (body) => ({ url: URLs.auth.signup, method: POST, body })
    }),
    login: build.mutation<LoginParams, GoogleAuthParams>({
      query: (body) => ({ url: URLs.auth.login, method: POST, body })
    }),
    googleAuth: build.mutation<LoginResponse, GoogleAuthParams>({
      query: (body) => ({ url: URLs.auth.googleAuth, method: POST, body })
    }),
    logout: build.mutation<void, void>({
      query: () => ({ url: URLs.auth.logout, method: POST })
    })
  })
})

export const {
  useSignUpMutation,
  useLoginMutation,
  useGoogleAuthMutation,
  useLogoutMutation
} = authService
