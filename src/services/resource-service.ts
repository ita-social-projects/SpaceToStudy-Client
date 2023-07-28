import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { createUrlPath } from '~/utils/helper-functions'

export const ResourceService = {
  getUsersLessons: () => {
    return axiosClient.get(URLs.resources.lessons.get)
  },
  deleteLesson: (id: string) => {
    return axiosClient.delete(createUrlPath(URLs.resources.lessons.delete, id))
  },
  editLesson: (id: string) => {
    return axiosClient.patch(createUrlPath(URLs.resources.lessons.patch, id))
  }
}
