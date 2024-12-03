import { UserRoleEnum } from '~/types/user/user.index'

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

export interface ReviewResponse {
  _id: string
  comment: string
  rating: number
  author: string
  targetUserId: string
  targetUserRole: UserRoleEnum
  offer: string
  createdAt: Date
  updatedAt: Date
}
