import { CourseCooperationResponse } from '~/types'
import { URLs } from '~/constants/request'
import { baseService } from '~/services/base-service'
import { getFullUrl } from '~/utils/get-full-url'

export const CoursesAndCooperationsService = {
  getByResourceId: async (
    resourceId: string
  ): Promise<CourseCooperationResponse> => {
    const url = getFullUrl({
      pathname: URLs.coursesAndCooperations.getByResourceId,
      searchParameters: { resourceId }
    })

    return await baseService.request<CourseCooperationResponse>({
      url,
      method: 'GET'
    })
  }
}
