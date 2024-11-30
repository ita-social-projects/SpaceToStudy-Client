import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import { ReviewData } from '~/types'

export const ReviewService = {
  submitReview: (data: ReviewData): Promise<AxiosResponse> => {
    return axiosClient.post(URLs.reviews.post, data)
  }
}
