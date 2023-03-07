import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const userService = {
  getUsers: (options) => {
    return axiosClient.get(URLs.users.get, { params: options })
  },
  getUserById: (userId) => {
    return axiosClient.get(`${URLs.users.get}/${userId}`)
  },
  deleteUser: (userId) => {
    return axiosClient.delete(`${URLs.users.get}/${userId}`)
  },
  deleteUsers: (userIds) => {
    return axiosClient.post(URLs.users.delete, userIds)
  },
  getUserReviews: (userId, options) => {
    return axiosClient.get(`${URLs.users.get}/${userId}`, { params: options })
  },
  getOneUser: (userId, userRole) => {
    return axiosClient.get(`${URLs.users.get}/${userId}/${userRole}`)
  },
  myProfile: () => {
    return axiosClient.get(URLs.users.myProfile)
  }
}
