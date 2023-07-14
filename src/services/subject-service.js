import { axiosClient } from '~/plugins/axiosClient'

import { URLs } from '~/constants/request'
import { createUrlPath } from '~/utils/helper-functions'

export const subjectService = {
  getSubjects: (params, categoryId) => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.get}`, { params })
  },
  getSubjectsNames: (categoryId) => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  }
}
