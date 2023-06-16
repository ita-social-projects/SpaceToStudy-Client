import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'

export const subjectService = {
  getSubjects: (
    params?: Pick<SubjectInterface, 'name'>,
    categoryId?: string
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    const categoryParam = categoryId ? `/${categoryId}` : ''
    return axiosClient.get(
      `${URLs.categories.get}${categoryParam}${URLs.subjects.get}`,
      { params }
    )
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const categoryParam = categoryId ? `/${categoryId}` : ''
    return axiosClient.get(
      `${URLs.categories.get}${categoryParam}${URLs.subjects.getNames}`
    )
  }
}
