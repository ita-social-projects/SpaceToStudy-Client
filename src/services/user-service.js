import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const userService = {
  getUsers: ({ skip, limit, order, orderBy, isEmailConfirmed, search, isFirstLogin }) => {
    const getUsersUrl = `${
      URLs.users.get
    }/?skip=${skip}&limit=${limit}&order=${order}&orderBy=${orderBy}&isEmailConfirmed=${isEmailConfirmed}&search=${search}&isFirstLogin=${isFirstLogin.join(
      ','
    )}`
    return axiosClient.get(getUsersUrl)
  },
  deleteUser: (userId) => {
    return axiosClient.delete(`${URLs.users.get}/${userId}`)
  },
  deleteUsers: (userIds) => {
    return axiosClient.post(URLs.users.delete, userIds)
  }
}
