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
  return emptyField(
    password,
    'common.errorMessages.emptyField',
    password !== data.password ? 'common.errorMessages.passwordsDontMatch' : ''
  )
}
