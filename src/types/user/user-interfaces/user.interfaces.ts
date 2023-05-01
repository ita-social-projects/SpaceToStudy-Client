import {
  CreatedAt,
  LastLogin,
  Sort,
  Address,
  Category,
  UserRole,
  UserRoleEnum
} from '~/types'

export interface LocalStorage {
  accessToken?: string
}

export interface GetUsersParams {
  createdAt: CreatedAt
  email: string
  lastLogin: LastLogin
  limit: number
  name: string
  role: UserRole
  skip: number
  sort: Sort
  status: string[]
}

export interface TotalReviews {
  [UserRoleEnum.Student]: number
  [UserRoleEnum.Tutor]: number
}

export interface UserResponse {
  _id: string
  role: UserRole[]
  firstName: string
  lastName: string
  email: string
  categories: Category[]
  totalReviews: TotalReviews
  averageRating: number
  nativeLanguage: string
  address: Address
  professionalSummary?: string
  photo?: string
  lastLogin: string
  createdAt: string
  updatedAt: string
}

export interface LoginParams {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
}

export interface GoogleAuthParams {
  token: string
  role?: UserRole
}

export interface SignupParams {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: UserRole
}

export interface SignupRespornse {
  userId: string
  userEmail: string
}

export interface AccessToken {
  id: string
  role: UserRole
  isFirstLogin: boolean
}
