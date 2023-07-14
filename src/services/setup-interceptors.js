import { accessToken } from '~/constants'
import { axiosClient } from '~/plugins/axiosClient'
import i18n from '~/plugins/i18n'
import { logoutUser } from '~/redux/reducer'
import { AuthService } from '~/services/auth-service'
import { getFromLocalStorage, setToLocalStorage } from './local-storage-service'

export const setupInterceptors = (store) => {
  axiosClient.interceptors.request.use((config) => {
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
    (config) => {
      return config
    },
    async (error) => {
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
