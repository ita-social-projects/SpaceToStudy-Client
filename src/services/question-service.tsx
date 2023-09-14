import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'
import { URLs } from '~/constants/request'
import { QuestionForm } from '~/types'

export const questionService = {
  createQuestion: async (data?: QuestionForm): Promise<AxiosResponse> => {
    return await axiosClient.post(URLs.question.post, data)
  }
}
