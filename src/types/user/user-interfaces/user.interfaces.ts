import {
  CreatedAt,
  LastLogin,
  Address,
  UserRole,
  RequestParams,
  Faq,
  DataByRole,
  UpdatedPhoto,
  UpdateFields,
  UserStatusEnum,
  UserMainSubject,
  NotificationSettings
} from '~/types'

export interface LocalStorage {
  'emoji-mart.last'?: string
  language?: string
  activation?: string
  cookieConsent?: boolean
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
  mainSubjects: DataByRole<UserMainSubject[]>
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
  status: DataByRole<UserStatusEnum>
  notificationSettings: NotificationSettings
  bookmarkedOffers: string[]
}

export interface ProfessionalBlock {
  education?: string
  workExperience?: string
  scientificActivities?: string
  awards?: string
  [key: string]: string | undefined
}

export interface UserGeneralInfo
  extends Pick<UserResponse, 'firstName' | 'lastName' | 'professionalSummary'> {
  country: UserResponse['address']['country'] | null
  city: UserResponse['address']['city'] | null
}

export interface UpdateUserParams
  extends Partial<Pick<UserResponse, UpdateFields>> {
  mainSubjects?: DataByRole<UserMainSubject[]>
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

export interface ChangePasswordParams {
  currentPassword: string
  password: string
  confirmPassword: string
}

export interface SignupResponse {
  userId: string
  userEmail: string
}

export interface AccessToken {
  id: string
  role: UserRole
  isFirstLogin: boolean
  status: UserStatusEnum
}
