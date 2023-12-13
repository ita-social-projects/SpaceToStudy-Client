import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { Course, CourseForm, GetCoursesParams } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const CourseService = {
  getCourses: async (params?: GetCoursesParams): Promise<AxiosResponse> =>
    await axiosClient.get(URLs.courses.get, { params }),
  addCourse: async (data?: CourseForm): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.courses.create, data),
  deleteCourse: async (id: string): Promise<AxiosResponse<Course>> =>
    await axiosClient.delete(createUrlPath(URLs.courses.delete, id))
}
