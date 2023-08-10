import { AxiosResponse } from 'axios'
import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import {
  GetLessonsParams,
  ItemsWithCount,
  Lesson,
  Attachment,
  AttachmentsParams
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const ResourceService = {
  getUsersLessons: async (
    params?: GetLessonsParams
  ): Promise<AxiosResponse<ItemsWithCount<Lesson>>> =>
    await axiosClient.get(URLs.resources.lessons.get, { params }),
  deleteLesson: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id)),
  editLesson: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.patch(createUrlPath(URLs.resources.lessons.patch, id)),
  getAttachments: async (
    params?: Partial<AttachmentsParams>
  ): Promise<AxiosResponse<ItemsWithCount<Attachment>>> =>
    await axiosClient.get(URLs.resources.attachments.get, { params })
}
