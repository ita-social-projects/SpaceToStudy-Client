import { URLs } from '~/constants/request'
import type {
  CreateCooperationsParams,
  GetCooperationsParams,
  UpdateCooperationsParams,
  CreateOrUpdateNoteParams,
  UpdateCooperationsSections,
  UpdateCooperationsNeedActionMessages,
  Cooperation,
  ItemsWithCount,
  UpdateResourceCompletionStatusParams,
  NoteResponse
} from '~/types'
import { getFullUrl } from '~/utils/get-full-url'
import { baseService } from '~/services/base-service'
import { AxiosResponse } from 'axios'
import { createUrlPath } from '~/utils/helper-functions'

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
    data:
      | UpdateCooperationsParams
      | UpdateCooperationsSections
      | UpdateCooperationsNeedActionMessages
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
  },
  updateResourceCompletionStatus: ({
    completionStatus,
    id,
    resourceId
  }: UpdateResourceCompletionStatusParams) => {
    return baseService.request<void>({
      data: { completionStatus },
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.cooperations.updateStatusById,
        parameters: { id, resourceId }
      })
    })
  }
}

export const CooperationNotesService = {
  getNotes: (cooperationId: string) => {
    return baseService.request<AxiosResponse<NoteResponse[]>>({
      method: 'GET',
      url: createUrlPath(URLs.notes.get, cooperationId)
    })
  },
  createNote: (data: CreateOrUpdateNoteParams, cooperationId: string) => {
    return baseService.request<AxiosResponse<NoteResponse>>({
      method: 'POST',
      url: getFullUrl({
        pathname: URLs.notes.create,
        parameters: { id: cooperationId }
      }),
      data
    })
  },
  updateNote: (
    cooperationId: string,
    noteId: string,
    data: CreateOrUpdateNoteParams
  ) => {
    return baseService.request<AxiosResponse<void>>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.notes.update,
        parameters: { id: cooperationId, noteId }
      }),
      data
    })
  },
  deleteNote: (cooperationId: string, noteId: string) => {
    return baseService.request<AxiosResponse<void>>({
      method: 'DELETE',
      url: getFullUrl({
        pathname: URLs.notes.delete,
        parameters: { id: cooperationId, noteId }
      })
    })
  }
}
