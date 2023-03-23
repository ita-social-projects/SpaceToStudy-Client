import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const subjectService = {
  getSubjects: () => {
    return axiosClient.get(URLs.subjects.get)
  }
}
