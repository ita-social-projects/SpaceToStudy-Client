import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { URLs } from '~/constants/request'
import {
  ReviewData,
  ReviewsResponse,
  GetReviewsParams,
  ReviewResponse
} from '~/types'

export const ReviewService = {
  submitReview: (data: ReviewData): Promise<AxiosResponse<ReviewResponse>> => {
    return axiosClient.post(URLs.reviews.post, data)
  },
  getUserReviews: (
    params: GetReviewsParams
  ): Promise<AxiosResponse<ReviewsResponse>> => {
    return axiosClient.get(URLs.reviews.get, { params })
  }
}
