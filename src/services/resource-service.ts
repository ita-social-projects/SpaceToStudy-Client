import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import {
  Attachment,
  GetAttachmentsParams,
  GetLessonsParams,
  ItemsWithCount,
  LessonData,
  Lesson
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const ResourceService = {
  getUsersLessons: async (
    params?: GetLessonsParams
  ): Promise<AxiosResponse<ItemsWithCount<Lesson>>> =>
    await axiosClient.get(URLs.resources.lessons.get, { params }),
  getLesson: async (id?: string): Promise<AxiosResponse<Lesson>> =>
    await axiosClient.get(createUrlPath(URLs.resources.lessons.get, id)),
  deleteLesson: async (id: string): Promise<AxiosResponse<Lesson>> =>
    await axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id)),
  addLesson: async (data: LessonData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.resources.lessons.add, data),
  editLesson: async (data: LessonData, id?: string): Promise<AxiosResponse> =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.lessons.patch, id),
      data
    ),
  getAttachments: async (
    params?: Partial<GetAttachmentsParams>
  ): Promise<AxiosResponse<ItemsWithCount<Attachment>>> =>
    await axiosClient.get(URLs.resources.attachments.get, { params }),
  deleteAttachment: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.attachments.delete, id)
    )
}
