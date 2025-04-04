import { URLs } from '~/constants/request'
import {
  ReviewData,
  ReviewsResponse,
  GetReviewsParams,
  ReviewResponse
} from '~/types'
import { baseService } from './base-service'
import { getFullUrl } from '~/utils/get-full-url'

export const ReviewService = {
  submitReview: (data: ReviewData) => {
    return baseService.request<ReviewResponse>({
      method: 'POST',
      url: URLs.reviews.post,
      data
    })
  },
  getUserReviews: (params: GetReviewsParams) => {
    const url = getFullUrl({
      pathname: URLs.reviews.get,
      searchParameters: {
        user: params.userId,
        role: params.userRole
      }
    })

    return baseService.request<ReviewsResponse>({ method: 'GET', url })
  }
}
