import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import {
  GetLessonsParams,
  ItemsWithCount,
  Lesson,
  Attachment,
  GetAttachmentsParams,
  NewLessonData
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const ResourceService = {
  getUsersLessons: async (
    params?: GetLessonsParams
  ): Promise<AxiosResponse<ItemsWithCount<Lesson>>> =>
    await axiosClient.get(URLs.resources.lessons.get, { params }),
  deleteLesson: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id)),
  addLesson: async (data: NewLessonData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.resources.lessons.add, data),
  editLesson: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.patch(createUrlPath(URLs.resources.lessons.patch, id)),
  getAttachments: async (
    params?: Partial<GetAttachmentsParams>
  ): Promise<AxiosResponse<ItemsWithCount<Attachment>>> =>
    await axiosClient.get(URLs.resources.attachments.get, { params })
}
