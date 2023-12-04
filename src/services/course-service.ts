import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { Course, CourseForm  } from '~/types'
import { RequestParams } from '~/types/services/types/services.types'
import { createUrlPath } from '~/utils/helper-functions'

export const CourseService = {
  getCourses: async (params?: Partial<RequestParams>): Promise<AxiosResponse> =>   
    await axiosClient.get(URLs.courses.get, { params }),
  addCourse: async (data?: CourseForm): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.courses.create, data),
  deleteCourse: async (id: string): Promise<AxiosResponse<Course>> =>
    await axiosClient.delete(createUrlPath(URLs.courses.delete, id))
}
