import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import {
  Attachment,
  GetResourcesParams,
  ItemsWithCount,
  LessonData,
  Lesson,
  NewLesson,
  UpdateAttachmentParams,
  Question,
  Categories
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const ResourceService = {
  getUsersLessons: async (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Lesson>>> =>
    await axiosClient.get(URLs.resources.lessons.get, { params }),
  getLesson: async (id?: string): Promise<AxiosResponse<Lesson>> =>
    await axiosClient.get(createUrlPath(URLs.resources.lessons.get, id)),
  deleteLesson: async (id: string): Promise<AxiosResponse<Lesson>> =>
    await axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id)),
  addLesson: async (data: NewLesson): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.resources.lessons.add, data),
  editLesson: async (data: LessonData, id?: string): Promise<AxiosResponse> =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.lessons.patch, id),
      data
    ),
  getAttachments: async (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Attachment>>> =>
    await axiosClient.get(URLs.resources.attachments.get, { params }),
  updateAttachment: async (params?: UpdateAttachmentParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.attachments.patch, params?.id),
      params
    ),
  deleteAttachment: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.attachments.delete, id)
    ),
  createAttachments: (data?: FormData): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.attachments.post, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getQuestions: (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Question>>> => {
    return axiosClient.get(URLs.resources.questions.get, { params })
  },

  deleteQuestion: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.questions.delete, id)
    ),
    getResourcesCategories: (
      params?: GetResourcesParams
    ): Promise<AxiosResponse<ItemsWithCount<Categories>>> => {
      return axiosClient.get(URLs.resources.resourcesCategories.get, { params })
    },
  getResourcesCategoriesNames: (): Promise<AxiosResponse<string[]>> =>
    axiosClient.get(URLs.resources.resourcesCategories.getNames)

}
