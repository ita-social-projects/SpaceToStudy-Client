import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { GetLessonsParams, ItemsWithCount, Lesson } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const ResourceService = {
  getUsersLessons: async (
    params?: GetLessonsParams
  ): Promise<AxiosResponse<ItemsWithCount<Lesson>>> =>
    await axiosClient.get(URLs.resources.lessons.get, { params }),
  deleteLesson: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id)),
  editLesson: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.patch(createUrlPath(URLs.resources.lessons.patch, id))
}
