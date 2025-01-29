import { CourseCooperationResponse } from '~/types'
import { URLs } from '~/constants/request'
import { baseService } from '~/services/base-service'
import { getFullUrl } from '~/utils/get-full-url'

export const CoursesAndCooperationsService = {
  getByResourceId: (resourceId: string) => {
    const url = getFullUrl({
      pathname: URLs.coursesAndCooperations.getByResourceId,
      searchParameters: { resourceId }
    })

    return baseService.request<CourseCooperationResponse>({
      url,
      method: 'GET'
    })
  }
}
