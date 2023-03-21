import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { Options, User } from '~/types/common/interfaces/common.interfaces'

export const userService = {
  getUsers: async (options: Options): Promise<AxiosResponse<User[]>> => {
    console.log(options)
    return await axiosClient.get(URLs.users.get, { params: options })
  },
  getOneUser: (userId: string, userRole: string): Promise<AxiosResponse<User>> => {
    return axiosClient.get(`${URLs.users.get}/${userId}/${userRole}`)
  },
  deleteUser: (userId: string): Promise<AxiosResponse<null>> => {
    return axiosClient.delete(`${URLs.users.get}/${userId}`)
  },
  deleteUsers: (userIds: string): Promise<AxiosResponse<null>> => {
    return axiosClient.post(URLs.users.delete, userIds)
  }
}
