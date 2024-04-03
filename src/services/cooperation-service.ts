import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CreateCooperationsParams,
  GetCooperationsParams,
  UpdateCooperationsParams,
  CreateOrUpdateNoteParams,
  Offer,
  MyCooperationDetails,
  UpdateCooperationsSections
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const cooperationService = {
  getCooperations: async (
    params: GetCooperationsParams
  ): Promise<AxiosResponse> =>
    await axiosClient.get(URLs.cooperations.get, { params }),
  createCooperation: async (
    data: CreateCooperationsParams
  ): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.cooperations.create, data),
  updateCooperation: async (
    data: UpdateCooperationsParams | UpdateCooperationsSections
  ): Promise<AxiosResponse> =>
    await axiosClient.patch(
      createUrlPath(URLs.cooperations.update, data._id),
      data
    ),
  getCooperationById: async (
    id?: string
  ): Promise<AxiosResponse<MyCooperationDetails<Offer>>> =>
    await axiosClient.get(createUrlPath(URLs.cooperations.get, id))
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
