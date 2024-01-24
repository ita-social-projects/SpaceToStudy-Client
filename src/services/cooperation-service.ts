import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import {
  CreateCooperationsParams,
  GetCooperationsParams,
  UpdateCooperationsParams,
  CreateNoteParams
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
    data: UpdateCooperationsParams
  ): Promise<AxiosResponse> =>
    await axiosClient.patch(
      createUrlPath(URLs.cooperations.update, data._id),
      data
    )
}

export const CooperationNotesService = {
  getNotes: async (cooperationId?: string): Promise<AxiosResponse> =>
    await axiosClient.get(createUrlPath(URLs.notes.get, cooperationId)),
  createNote: async (
    data?: CreateNoteParams,
    cooperationId?: string
  ): Promise<AxiosResponse> =>
    await axiosClient.post(
      createUrlPath(URLs.notes.create, cooperationId),
      data
    )
}
