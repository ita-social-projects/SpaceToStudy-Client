import {
  CreatedAt,
  LastLogin,
  Address,
  UserRole,
  RequestParams,
  SubjectInterface,
  SubjectNameInterface,
  Faq,
  DataByRole
} from '~/types'

export interface LocalStorage {
  'emoji-mart.last'?: string
}

export interface GetUsersParams extends RequestParams {
  createdAt: CreatedAt
  email: string
  lastLogin: LastLogin
  name: string
  role: UserRole
  status: string[]
}

export interface UserResponse {
  _id: string
  role: UserRole[]
  firstName: string
  lastName: string
  email: string
  mainSubjects: SubjectInterface[]
  totalReviews: DataByRole<number>
  averageRating: DataByRole<number>
  nativeLanguage: string
  address: Address
  professionalSummary?: string
  photo?: string
  lastLogin: string
  createdAt: string
  updatedAt: string
  FAQ: DataByRole<Faq[]>
}

export interface UpdateUserParams
  extends Pick<
    UserResponse,
    | 'photo'
    | 'firstName'
    | 'lastName'
    | 'address'
    | 'professionalSummary'
    | 'nativeLanguage'
  > {
  mainSubjects: SubjectNameInterface[]
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

export interface SignupResponse {
  userId: string
  userEmail: string
}

export interface AccessToken {
  id: string
  role: UserRole
  isFirstLogin: boolean
}
