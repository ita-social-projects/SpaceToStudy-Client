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

export const validateNewPassword = (
  newPasswordValue: string,
  data: typeof initialValues
) => {
  if (newPasswordValue === data.currentPassword) {
    return emptyField({
      value: newPasswordValue,
      helperText: 'common.errorMessages.currentAndNewPasswordsMatch'
    })
  }
  return password(newPasswordValue)
}

export const validations = {
  currentPassword: validatePassword,
  password: validateNewPassword,
  confirmPassword
}
