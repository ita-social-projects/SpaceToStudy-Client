import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { getUsersParams, User } from '~/types'

export const userService = {
  getUsers: async (params: getUsersParams): Promise<AxiosResponse<User[]>> => {
    return await axiosClient.get(URLs.users.get, { params })
  },
  getOneUser: (userId: string, userRole: string): Promise<AxiosResponse<User>> => {
    return axiosClient.get(`${URLs.users.get}/${userId}?role=${userRole}`)
  },
  deleteUser: (userId: string): Promise<AxiosResponse<null>> => {
    return axiosClient.delete(`${URLs.users.get}/${userId}`)
  },
  deleteUsers: (userIds: string): Promise<AxiosResponse<null>> => {
    return axiosClient.post(URLs.users.delete, userIds)
  }
}
