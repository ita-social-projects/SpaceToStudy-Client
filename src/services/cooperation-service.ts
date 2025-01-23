import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import type {
  CreateCooperationsParams,
  GetCooperationsParams,
  UpdateCooperationsParams,
  CreateOrUpdateNoteParams,
  UpdateCooperationsSections,
  Cooperation,
  ItemsWithCount
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'
import { getFullUrl } from '~/utils/get-full-url'
import { baseService } from '~/services/base-service'

export const cooperationService = {
  getCooperations: async (params: GetCooperationsParams) => {
    const url = getFullUrl({
      pathname: URLs.cooperations.get,
      searchParameters: params
    })

    return baseService.request<ItemsWithCount<Cooperation>>({
      method: 'GET',
      url
    })
  },
  createCooperation: (data: CreateCooperationsParams) => {
    return baseService.request<void>({
      method: 'POST',
      url: URLs.cooperations.create,
      data
    })
  },
  updateCooperation: async (
    data: UpdateCooperationsParams | UpdateCooperationsSections
  ) => {
    const url = getFullUrl({
      pathname: URLs.cooperations.updateById,
      parameters: {
        id: data._id
      }
    })

    return baseService.request<void>({
      data,
      method: 'PATCH',
      url
    })
  },
  getCooperationById: async (id: string) => {
    return baseService.request<Cooperation>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.cooperations.getById,
        parameters: { id }
      })
    })
  }
}

export const CooperationNotesService = {
  getNotes: async (cooperationId?: string): Promise<AxiosResponse> =>
    await axiosClient.get(
      createUrlPath(
        `${URLs.cooperations.get}/${cooperationId}${URLs.notes.get}`
      )
    ),
  createNote: async (
    data?: CreateOrUpdateNoteParams,
    cooperationId?: string
  ): Promise<AxiosResponse> =>
    await axiosClient.post(
      createUrlPath(
        `${URLs.cooperations.get}/${cooperationId}${URLs.notes.create}`
      ),
      data
    ),
  updateNote: async (
    cooperationId: string = '',
    noteId: string = '',
    data?: CreateOrUpdateNoteParams
  ): Promise<AxiosResponse> =>
    await axiosClient.patch(
      createUrlPath(
        `${URLs.cooperations.update}/${cooperationId}${URLs.notes.update}/${noteId}`
      ),
      data
    ),
  deleteNote: async (
    cooperationId: string,
    noteId: string
  ): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(
        `${URLs.cooperations.delete}/${cooperationId}${URLs.notes.delete}/${noteId}`
      )
    )
}
