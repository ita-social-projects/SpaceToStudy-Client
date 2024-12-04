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

export interface ReviewDataFromCooperation {
  data: Pick<ReviewData, 'targetUserId' | 'targetUserRole' | 'offer'>
}

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

// {
//   "count": 2,
//   "reviews": [
//     {
//       "_id": "6749b597d56cea71c7d084c0",
//       "comment": "Best design tutor ever",
//       "rating": 5,
//       "author": {
//         "_id": "6736195c6b214652201af59d",
//         "firstName": "Di",
//         "lastName": "Va",
//         "photo": ""
//       },
//       "targetUserId": "673615d36b214652201af558",
//       "targetUserRole": "tutor",
//       "offer": {
//         "_id": "6736192e6b214652201af589",
//         "subject": { "_id": "673617d99b9f19766f53f9f4", "name": "Design" },
//         "category": { "_id": "64884f59fdc2d1a130c24ac8", "name": "Design" }
//       },
//       "createdAt": "2024-11-29T12:37:43.367Z",
//       "updatedAt": "2024-11-29T12:37:43.367Z",
//       "proficiencyLevel": "Intermediate"
//     },
