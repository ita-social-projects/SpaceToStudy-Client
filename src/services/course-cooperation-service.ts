import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { axiosClient } from '~/plugins/axiosClient'
import { CourseCooperationResponse } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const CoursesAndCooperationsService = {
  getByResourceId: async (
    resourceId: string
  ): Promise<AxiosResponse<CourseCooperationResponse>> =>
    await axiosClient.get(
      createUrlPath(URLs.coursesAndCooperations.getByResourceId, resourceId)
    )
}
