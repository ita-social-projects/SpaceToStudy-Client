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

