import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { SubjectInterface, SubjectNameInterface } from '~/types'

export const subjectService = {
  getSubjects: (): Promise<AxiosResponse<SubjectInterface[]>> => {
    return axiosClient.get(URLs.subjects.get)
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
