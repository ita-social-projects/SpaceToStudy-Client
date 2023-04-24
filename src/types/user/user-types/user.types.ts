import { UserRoleEnum } from '~/types'

export type UserRole =
  | UserRoleEnum.Admin
  | UserRoleEnum.Tutor
  | UserRoleEnum.Student
