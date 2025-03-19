import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import type {
  Course,
  CourseForm,
  GetCoursesParams,
  ItemsWithCount
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'
import { getFullUrl } from '~/utils/get-full-url'
import { baseService } from './base-service'

export interface Resource {
  _id: string
  name: string
  type: string
}

export interface Section {
  _id: string
  title: string
  resources: Resource[]
}

export interface ResourceData {
  sections: Section[]
}

export const CourseService = {
  getCourses: async (params?: GetCoursesParams): Promise<AxiosResponse> =>
    await axiosClient.get(URLs.courses.get, { params }),
  getCoursesWithBaseService: () => {
    return baseService.request<ItemsWithCount<Course>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.courses.get
      })
    })
  },
  getCoursesWithFilters: (params: GetCoursesParams) => {
    return baseService.request<ItemsWithCount<Course>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.courses.get,
        searchParameters: params
      })
    })
  },
  addCourse: async (data?: CourseForm): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.courses.create, data),
  addCourseQuery: async (data: CourseForm) => {
    return baseService.request<Course>({
      method: 'POST',
      url: URLs.courses.create,
      data
    })
  },
  getCourseQuery: (id: string) => {
    return baseService.request<Course>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.courses.getById,
        parameters: { id }
      })
    })
  },
  editCourseQuery: async (id: string, data: CourseForm) => {
    return baseService.request<void>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.courses.patch,
        parameters: { id }
      }),
      data
    })
  },
  deleteCourse: async (id: string): Promise<AxiosResponse<Course>> =>
    await axiosClient.delete(createUrlPath(URLs.courses.delete, id))
}
