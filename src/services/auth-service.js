import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'

export const AuthService = {
  login: (userData) => {
    return axiosClient.post(URLs.auth.login, userData)
  },
  googleAuth: (userData) => {
    return axiosClient.post(URLs.auth.googleAuth, userData)
  },
  signup: (userData) => {
    return axiosClient.post(URLs.auth.signup, userData)
  },
  logout: () => {
    return axiosClient.post(URLs.auth.logout)
  },
  refresh: () => {
    return axiosClient.get(URLs.auth.refresh)
  },
  confirmEmail: (confirmToken) => {
    const confirmUrl = createUrlPath(URLs.auth.confirm, confirmToken)
    return axiosClient.get(confirmUrl)
  },
  forgotPassword: (userEmail) => {
    return axiosClient.post(URLs.auth.forgotPassword, userEmail)
  },
  resetPassword: (resetToken, newPassword) => {
    const confirmUrl = createUrlPath(URLs.auth.resetPassword, resetToken)
    return axiosClient.patch(confirmUrl, newPassword)
  }
}
