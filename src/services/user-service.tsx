import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import {
  GetUsersParams,
  UpdateUserParams,
  UserResponse,
  UserRole
} from '~/types'

export const userService = {
  getUsers: async (
    params: GetUsersParams
  ): Promise<AxiosResponse<UserResponse[]>> => {
    return await axiosClient.get(URLs.users.get, { params })
  },
  getUserById: (
    userId: string,
    userRole: UserRole
  ): Promise<AxiosResponse<UserResponse>> => {
    return axiosClient.get(`${URLs.users.get}/${userId}?role=${userRole}`)
  },
  updateUser: (
    userId: string,
    params: UpdateUserParams
  ): Promise<AxiosResponse<null>> => {
    return axiosClient.patch(`${URLs.users.update}/${userId}`, params)
  },
  deleteUser: (userId: string): Promise<AxiosResponse<null>> => {
    return axiosClient.delete(`${URLs.users.get}/${userId}`)
  },
  deleteUsers: (userIds: string): Promise<AxiosResponse<null>> => {
    return axiosClient.post(URLs.users.delete, userIds)
  }
}
