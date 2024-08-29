import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'
import {
  GetUsersParams,
  UpdateUserParams,
  UserResponse,
  UserRole,
  GetOffersParams
} from '~/types'

export const userService = {
  getUsers: async (
    params: GetUsersParams
  ): Promise<AxiosResponse<UserResponse[]>> => {
    return await axiosClient.get(URLs.users.get, { params })
  },
  getUserById: (
    userId: string,
    userRole: UserRole,
    isEdit?: boolean
  ): Promise<AxiosResponse<UserResponse>> => {
    return axiosClient.get(
      createUrlPath(URLs.users.get, userId, { role: userRole, isEdit })
    )
  },
  updateUser: (
    userId: string,
    params: UpdateUserParams
  ): Promise<AxiosResponse<null>> => {
    return axiosClient.patch(createUrlPath(URLs.users.update, userId), params)
  },
  deleteUser: (userId: string): Promise<AxiosResponse<null>> => {
    return axiosClient.delete(createUrlPath(URLs.users.get, userId))
  },
  deleteUsers: (userIds: string[]): Promise<AxiosResponse<null>> => {
    return axiosClient.post(URLs.users.delete, userIds)
  },
  deactivateUser: (userId: string): Promise<AxiosResponse<null>> => {
    return axiosClient.patch(createUrlPath(URLs.users.deactivate, userId))
  },
  activateUser: (userId: string): Promise<AxiosResponse<null>> => {
    return axiosClient.patch(createUrlPath(URLs.users.activate, userId))
  },

  toggleBookmark: (
    userId: string,
    offerId: string
  ): Promise<AxiosResponse<string[]>> => {
    const user = createUrlPath(URLs.users.get, userId)
    const bookmarkedOffers = createUrlPath(URLs.users.bookmarks, offerId)

    return axiosClient.patch(`${user}${bookmarkedOffers}`)
  },

  getBookmarkedOffers: async (
    userId: string,
    params?: GetOffersParams
  ): Promise<AxiosResponse> => {
    const userPath = createUrlPath(URLs.users.get, userId)

    return await axiosClient.get(`${userPath}${URLs.users.bookmarks}`, {
      params
    })
  }
}
