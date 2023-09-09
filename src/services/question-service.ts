import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'

export const questionService = {
  getQuestions: () => {
    return axiosClient.get(URLs.example.get)
  }
}
