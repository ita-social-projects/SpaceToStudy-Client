import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { SubjectInterface } from '~/types'

export const subjectService = {
  getSubjects: (): Promise<AxiosResponse<SubjectInterface[]>> => {
    return axiosClient.get(URLs.subjects.get)
  },
  getSubjectsNames: (categoryId: string): Promise<AxiosResponse<Pick<SubjectInterface, '_id' | 'name'>[]>> => {
    const categoryParam = categoryId ? `/${categoryId}` : ''
    return axiosClient.get(`${URLs.categories.get}${categoryParam}${URLs.subjects.getNames}`)
  }
}
