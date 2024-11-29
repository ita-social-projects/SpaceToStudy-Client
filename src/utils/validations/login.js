import { helperTextHandler, nameField, emptyField } from './common'

export const email = (value) => {
  return helperTextHandler(value, 'email')
}

export const password = (value) => {
  return helperTextHandler(value, 'password')
}

export const firstName = (value) => {
  return nameField(value)
}

export const lastName = (value) => {
  return nameField(value)
}

export const confirmPassword = (password, data) => {
  return emptyField({
    value: password,
    emptyMessage: 'common.errorMessages.emptyField',
    helperText:
      password !== data.password
        ? 'common.errorMessages.passwordsDontMatch'
        : ''
  })
}

export const logInPassword = (password) => {
  return emptyField({
    value: password,
    emptyMessage: 'common.errorMessages.emptyField',
    helperText:
      password.length < 8 || password.length > 25
        ? 'common.errorMessages.passwordLength'
        : ''
  })
}
