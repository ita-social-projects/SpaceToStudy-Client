import { AxiosError, AxiosRequestConfig } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { logoutUser } from '~/redux/reducer'
import i18n from '~/plugins/i18n'
import { Store } from '~/redux/store'

export const setupInterceptors = (store: Store): void => {
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
          void store.dispatch(logoutUser())
        }
      }
      return Promise.reject(error)
    }
  )
}
