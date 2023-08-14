import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { ItemsWithCount, QuizzesParams, Quiz } from '~/types'

export const quizService = {
  getQuizzes: (
    params?: Partial<QuizzesParams>
  ): Promise<AxiosResponse<ItemsWithCount<Quiz>>> => {
    return axiosClient.get(URLs.quizzes.get, { params })
  }
}
