import { AxiosError, AxiosRequestConfig } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import i18n from '~/plugins/i18n'
import { authService } from '~/services/auth-service'

export const setupInterceptors = (): void => {
  axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      'Accept-Language': i18n.language
    }
    return config
  })

  axiosClient.interceptors.response.use(
    (config: AxiosRequestConfig) => {
      return config
    },
    async (error: AxiosError) => {
      const originalRequest = error.config
      if (error.code === 'UNAUTHORIZED' && error.config) {
        try {
          return await axiosClient.request(originalRequest)
        } catch (e) {
          void authService.endpoints.logout.initiate()
        }
      }
      return Promise.reject(error)
    }
  )
}
