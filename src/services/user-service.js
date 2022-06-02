import { request } from '~/plugins/request'
import { URLs } from '~/constants/request'

export const UserService = {
  login: (userData) => {
    return request.post(URLs.user.login, userData)
  }
}
