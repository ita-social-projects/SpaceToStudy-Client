import { emptyField } from '~/utils/validations/common'
import { confirmPassword, password } from '~/utils/validations/login'

export const initialValues = {
  currentPassword: '',
  password: '',
  confirmPassword: ''
}

export const validatePassword = (passwordValue: string) => {
  if (!passwordValue) {
    return emptyField({ value: passwordValue })
  }
  return password(passwordValue)
}

export const validations = {
  currentPassword: validatePassword,
  password: validatePassword,
  confirmPassword
}
