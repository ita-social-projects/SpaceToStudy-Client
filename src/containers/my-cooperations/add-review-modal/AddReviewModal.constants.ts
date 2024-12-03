import { nullNumberFiled } from '~/utils/validations/common'
import { UserRoleEnum } from '~/types'

export const initialValues = {
  comment: '',
  rating: 0,
  targetUserId: '',
  targetUserRole: 'student' as UserRoleEnum.Student,
  offer: ''
}

export const validations = {
  // rating: (value: number) => nullNumberFiled(value)
}
