import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

import { URLs } from '~/constants/request'
import { ItemsWithCount, SubjectInterface, SubjectNameInterface } from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const subjectService = {
  getSubjects: (
    params?: Pick<SubjectInterface, 'name'>,
    categoryId?: string
  ): Promise<AxiosResponse<ItemsWithCount<SubjectInterface>>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.get}`, { params })
  },
  getSubjectsNames: (
    categoryId: string | null
  ): Promise<AxiosResponse<SubjectNameInterface[]>> => {
    const category = createUrlPath(URLs.categories.get, categoryId)
    return axiosClient.get(`${category}${URLs.subjects.getNames}`)
  },

  sendSubjectRequest: (): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
      url: 'https://api.example.com/subjects',
      method: 'get',
      headers: {
        Authorization: 'Bearer your-token-here',
        'Content-Type': 'application/json'
      }
    }

    return Promise.resolve({
      data: { message: 'Success' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config
    } as AxiosResponse)
  }
}
