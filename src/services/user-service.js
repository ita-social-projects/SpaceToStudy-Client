import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'

export const userService = {
  getUsers: async (params) => {
    return await axiosClient.get(URLs.users.get, { params })
  },
  getUserById: (userId, userRole) => {
    return axiosClient.get(
      createUrlPath(URLs.users.get, userId, { role: userRole })
    )
  },
  updateUser: (userId, params) => {
    return axiosClient.patch(createUrlPath(URLs.users.update, userId), params)
  },
  deleteUser: (userId) => {
    return axiosClient.delete(createUrlPath(URLs.users.get, userId))
  },
  deleteUsers: (userIds) => {
    return axiosClient.post(URLs.users.delete, userIds)
  }
}
