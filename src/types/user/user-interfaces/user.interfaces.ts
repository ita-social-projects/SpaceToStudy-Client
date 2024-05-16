import {
  CreatedAt,
  LastLogin,
  Address,
  UserRole,
  RequestParams,
  SubjectInterface,
  SubjectNameInterface,
  Faq,
  DataByRole,
  UpdatedPhoto
} from '~/types'

export interface LocalStorage {
  'emoji-mart.last'?: string
  language?: string
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
  mainSubjects: { student: SubjectInterface[]; tutor: SubjectInterface[] }
  totalReviews: DataByRole<number>
  averageRating: DataByRole<number>
  nativeLanguage: string | null
  address: Address
  professionalSummary?: string
  photo?: string | null
  lastLogin: string
  createdAt: string
  updatedAt: string
  FAQ: DataByRole<Faq[]>
  videoLink: DataByRole<string>
  professionalBlock?: ProfessionalBlock
}

export interface ProfessionalBlock {
  education?: string
  workExperience?: string
  scientificActivities?: string
  awards?: string
}

export interface UserGeneralInfo
  extends Pick<UserResponse, 'firstName' | 'lastName' | 'professionalSummary'> {
  country: UserResponse['address']['country'] | null
  city: UserResponse['address']['city'] | null
}

export interface UpdateUserParams
  extends Partial<
    Pick<
      UserResponse,
      | 'firstName'
      | 'lastName'
      | 'address'
      | 'professionalSummary'
      | 'nativeLanguage'
      | 'professionalBlock'
    >
  > {
  mainSubjects?: SubjectNameInterface[]
  videoLink?: string
  photo?: UpdatedPhoto | null
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
