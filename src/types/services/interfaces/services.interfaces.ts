import { CreatedAt, LastLogin, Address, Category } from '~/types/types/common.types'
import { Params } from '~/types/services/services.index'

export interface GetUsersParams extends Params {
  createdAt: CreatedAt
  email: string
  lastLogin: LastLogin
  role: string
  status: string[]
}

export interface UserResponse {
  _id: string
  role: string[]
  firstName: string
  lastName: string
  email: string
  categories: Category[]
  totalReviews: number
  averageRating: number
  nativeLanguage: string
  address: Address
  education: string
  photo: string
  lastLogin: string
  createdAt: string
  updatedAt: string
}
