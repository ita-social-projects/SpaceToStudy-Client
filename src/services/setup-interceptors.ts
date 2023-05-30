import { AxiosError, AxiosRequestConfig } from 'axios'
import { accessToken } from '~/constants'
import { axiosClient } from '~/plugins/axiosClient'
import { logoutUser } from '~/redux/reducer'
import { AuthService } from '~/services/auth-service'
import { getFromLocalStorage, setToLocalStorage } from './local-storage-service'
import i18n from '~/plugins/i18n'
import { Store } from '~/redux/store'

export const setupInterceptors = (store: Store): void => {
  axiosClient.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getFromLocalStorage(accessToken)
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    }
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
          const { data } = await AuthService.refresh()
          setToLocalStorage(accessToken, data.accessToken)
          return axiosClient.request(originalRequest)
        } catch (e) {
          void store.dispatch(logoutUser())
        }
      }
      return Promise.reject(error)
    }
  )
}
