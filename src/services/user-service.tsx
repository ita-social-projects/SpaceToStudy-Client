import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'
import { getFullUrl } from '~/utils/get-full-url'
import { baseService } from './base-service'
import type {
  GetUsersParams,
  UpdateUserParams,
  UserResponse,
  UserRole,
  GetOffersParams,
  ItemsWithCount
} from '~/types'

export const userService = {
  getUsers: (params: GetUsersParams) => {
    return baseService.request<ItemsWithCount<UserResponse>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.users.get,
        searchParameters: params
      })
    })
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
  getUserByIdWithBaseService: (
    id: string,
    userRole: UserRole,
    isEdit?: boolean
  ) => {
    return baseService.request<UserResponse>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.users.getUserById,
        parameters: { id },
        searchParameters: {
          userRole,
          isEdit: isEdit?.toString() ?? undefined
        }
      })
    })
  },
  updateUser: (userId: string, params: UpdateUserParams) => {
    return baseService.request<void>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.users.update,
        parameters: { id: userId }
      }),
      data: params
    })
  },
  deleteUser: (userId: string) => {
    return baseService.request<null>({
      method: 'DELETE',
      url: getFullUrl({
        pathname: URLs.users.delete,
        parameters: { id: userId }
      })
    })
  },
  deleteUsers: (userIds: string[]) => {
    return baseService.request<null>({
      method: 'POST',
      url: getFullUrl({
        pathname: URLs.users.deleteMany
      }),
      data: userIds
    })
  },
  deactivateUser: (userId: string) => {
    return baseService.request<null>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: `${URLs.users.deactivate}/${userId}`
      })
    })
  },
  activateUser: (userId: string) => {
    return baseService.request<null>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: `${URLs.users.activate}/${userId}`
      })
    })
  },
  toggleBookmark: (userId: string, offerId: string) => {
    return baseService.request<string[]>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.users.updateBookmarks,
        parameters: { userId, offerId }
      })
    })
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
