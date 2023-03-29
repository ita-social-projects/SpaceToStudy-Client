import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { SubjectInterface } from '~/types'

export const subjectService = {
  getSubjects: (): Promise<AxiosResponse<SubjectInterface[]>> => {
    return axiosClient.get(URLs.subjects.get)
  }
}
