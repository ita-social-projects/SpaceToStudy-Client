import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const userService = {
  getUsers: (options) => {
    return axiosClient.get(URLs.users.get, { params: options })
  },
  deleteUser: (userId) => {
    return axiosClient.delete(`${URLs.users.get}/${userId}`)
  },
  deleteUsers: (userIds) => {
    return axiosClient.post(URLs.users.delete, userIds)
  }
}
