import {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosHeaders,
  AxiosResponse
} from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import i18n from '~/plugins/i18n'
import { authService } from '~/services/auth-service'

export const setupInterceptors = (): void => {
  axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers = AxiosHeaders.concat(config.headers, {
      'Accept-Language': i18n.language
    })

    return config
  })

  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig
      if (error.code === 'UNAUTHORIZED' && error.config) {
        try {
          return await axiosClient.request(originalRequest)
        } catch (e) {
          return authService.endpoints.logout.initiate()
        }
      }
      return Promise.reject(error)
    }
  )
}
