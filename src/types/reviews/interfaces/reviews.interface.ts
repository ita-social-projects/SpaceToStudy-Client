import { UserRoleEnum } from '~/types/user/user.index'
import { SubjectInterface } from '~/types/common/common.index'
import { CategoryInterface } from '~/types/common/common.index'
import { ProficiencyLevelEnum } from '~/types/common/common.index'

export interface ReviewData {
  comment: string
  rating: number
  targetUserId: string
  targetUserRole: UserRoleEnum
  offer: string
}

export type ReviewDataFromCooperation = Pick<
  ReviewData,
  'targetUserId' | 'targetUserRole' | 'offer'
>

export interface DataFromCooperation {
  targetUserId: string
  targetUserRole: UserRoleEnum
  offer: string
}

export interface ReviewAuthor {
  _id: string
  firstName: string
  lastName: string
  photo: string
}

export interface ReviewOffer {
  _id: string
  subject: Pick<SubjectInterface, '_id' | 'name'>
  category: Pick<CategoryInterface, '_id' | 'name'>
}

export interface ReviewResponse extends Omit<ReviewData, 'offer'> {
  _id: string
  author: ReviewAuthor
  offer: ReviewOffer
  createdAt: string
  updatedAt: string
  proficiencyLevel: ProficiencyLevelEnum
}

export interface ReviewsResponse {
  count: number
  reviews: ReviewResponse[]
}

export interface GetReviewsParams {
  userId: string
  userRole: UserRoleEnum
}
