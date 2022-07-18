import { accessToken } from '~/constants'
import { axiosClient } from '~/plugins/axiosClient'
import { logoutUser } from '~/redux/reducer'
import { AuthService } from '~/services/auth-service'
import { getFromLocalStorage, setToLocalStorage } from './local-storage-service'

export const setupInterceptors = (store) => {
  axiosClient.interceptors.request.use((config) => {
    const token = getFromLocalStorage(accessToken)
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  })

  axiosClient.interceptors.response.use(
    (config) => {
      return config
    },
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true
        try {
          const { data } = await AuthService.refresh()
          setToLocalStorage(accessToken, data.accessToken)
          return axiosClient.request(originalRequest)
        } catch (e) {
          store.dispatch(logoutUser())
        }
      }
      return Promise.reject(error)
    }
  )
}
