import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { UserOptions } from '~/types/user-table/types/user-table.types'

export const userService = {
  getUsers: (options: UserOptions): Promise<AxiosResponse<unknown, unknown>> => {
    return axiosClient.get(URLs.users.get, { params: options })
  },
  getUserById: (userId: string): Promise<AxiosResponse<unknown, unknown>> => {
    return axiosClient.get(`${URLs.users.get}/${userId}`)
  },
  deleteUser: (userId: string): Promise<AxiosResponse<unknown, unknown>> => {
    return axiosClient.delete(`${URLs.users.get}/${userId}`)
  },
  deleteUsers: (userIds: string[]): Promise<AxiosResponse<unknown, unknown>> => {
    return axiosClient.post(URLs.users.delete, userIds)
  }
}
