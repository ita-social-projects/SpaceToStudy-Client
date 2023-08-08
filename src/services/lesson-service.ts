import { axiosClient } from '~/plugins/axiosClient'
import { AxiosResponse } from 'axios'

import { URLs } from '~/constants/request'
import { NewLessonData } from '~/types'

export const lessonService = {
  addLesson: async (data: NewLessonData): Promise<AxiosResponse> =>
    await axiosClient.post(URLs.lesson.add, data)
}
