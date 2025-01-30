import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'
import { baseService } from '~/services/base-service'
import { getFullUrl } from '~/utils/get-full-url'

export const subjectService = {
  getSubjects: (
    params: Pick<SubjectInterface, 'name'> & Record<'categoryId', string>
  ) => {
    const { categoryId, ...restParams } = params

    let resultUrl = getFullUrl({
      pathname: URLs.subjects.get,
      searchParameters: restParams
    })

    if (categoryId) {
      resultUrl = getFullUrl({
        pathname: URLs.subjects.getByCategoryId,
        parameters: { id: categoryId },
        searchParameters: restParams
      })
    }

    return baseService.request<ItemsWithCount<SubjectInterface>>({
      method: 'GET',
      url: resultUrl
    })
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  }
}
