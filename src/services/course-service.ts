import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'

interface GetCoursesParams {
  limit: number
  skip: number
}

export const CourseService = {
  getCourses: async (params?: GetCoursesParams): Promise<AxiosResponse> => {
    const response = await axiosClient.get(URLs.courses.get, {
      params
    })

    return response
  }
}
