import { CreatedAt, LastLogin, Sort, Address, Category } from '~/types/types/common.types'

export interface getUsersParams {
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
