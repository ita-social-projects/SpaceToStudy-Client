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
  getCourse: async (id?: string): Promise<AxiosResponse<Course>> =>
    await axiosClient.get(createUrlPath(URLs.courses.get, id)),
  editCourse: async (data: CourseForm, id?: string): Promise<AxiosResponse> =>
    await axiosClient.patch(createUrlPath(URLs.courses.patch, id), data),
  deleteCourse: async (id: string): Promise<AxiosResponse<Course>> =>
    await axiosClient.delete(createUrlPath(URLs.courses.delete, id))
}
