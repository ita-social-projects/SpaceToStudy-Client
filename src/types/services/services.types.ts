import { CreatedAt, LastLogin, Sort, Address, Category } from '~/types/common/types/common.types'

export interface GetUsersParams {
  createdAt: CreatedAt
  email: string
  lastLogin: LastLogin
  limit: number
  name: string
  role: string
  skip: number
  sort: Sort
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

export type Params = {
  match: string
  limit: number
}

export interface ErrorResponse {
  code: string
  message: string
  status: number
}
