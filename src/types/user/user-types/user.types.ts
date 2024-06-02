import { UserRoleEnum } from '~/types'

export type UserRole =
  | UserRoleEnum.Admin
  | UserRoleEnum.Tutor
  | UserRoleEnum.Student

export type UpdateFields =
  | 'firstName'
  | 'lastName'
  | 'address'
  | 'professionalSummary'
  | 'nativeLanguage'
  | 'professionalBlock'

export type MainUserRole = UserRoleEnum.Tutor | UserRoleEnum.Student
