import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { CourseForm } from '~/types'

import { RequestParams } from '~/types/services/types/services.types'

export const CourseService = {
  getCourses: async (params?: Partial<RequestParams>): Promise<AxiosResponse> =>
    await axiosClient.get(URLs.courses.get, { params }),
  addCourse: async (data?: CourseForm): Promise<AxiosResponse> => {
    return await axiosClient.post(URLs.courses.create, data)
  }
}
