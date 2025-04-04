import { URLs } from '~/constants/request'
import type {
  Course,
  CourseForm,
  GetCoursesParams,
  ItemsWithCount
} from '~/types'
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
  getCourses: (params: GetCoursesParams) => {
    return baseService.request<ItemsWithCount<Course>>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.courses.get,
        searchParameters: params
      })
    })
  },
  addCourse: (data: CourseForm) => {
    return baseService.request<Course>({
      method: 'POST',
      url: URLs.courses.create,
      data
    })
  },
  getCourse: (id: string) => {
    return baseService.request<Course>({
      method: 'GET',
      url: getFullUrl({
        pathname: URLs.courses.getById,
        parameters: { id }
      })
    })
  },
  editCourse: (id: string, data: CourseForm) => {
    return baseService.request<void>({
      method: 'PATCH',
      url: getFullUrl({
        pathname: URLs.courses.patch,
        parameters: { id }
      }),
      data
    })
  },
  deleteCourse: (id: string) => {
    return baseService.request<void>({
      method: 'DELETE',
      url: getFullUrl({
        pathname: URLs.courses.delete,
        parameters: { id }
      })
    })
  }
}
