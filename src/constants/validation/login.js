import { emptyField } from './common'

export const email = (value) => {
  let helperText
  if (!RegExp(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i).test(value)) {
    helperText = 'common.errorMessages.emailValid'
  }
  helperText = emptyField(value, helperText)
  return helperText
}

export const password = (value) => {
  let helperText
  if (!RegExp(/^((?=\S*?[A-ZА-Я])(?=\S*?[a-zа-я])(?=\S*?[0-9]).)(?=\S*?[ -/:-@[-`{-~])\S/).test(value)) {
    helperText = 'common.errorMessages.passwordValid'
  }
  if (value.length < 8 || value.length > 25) {
    helperText = 'common.errorMessages.passwordLength'
  }
  helperText = emptyField(value, helperText)
  return helperText
}

export const firstName = (value) => {
  let helperText
  if (value.length > 30) {
    helperText = 'common.errorMessages.firstNameLength'
  }
  if (!RegExp(/^[a-z]+$/i).test(value)) {
    helperText = 'common.errorMessages.firstNameAlphabeticOnly'
  }
  helperText = emptyField(value, helperText)
  return helperText
}

export const lastName = (value) => {
  let helperText
  if (value.length > 30) {
    helperText = 'common.errorMessages.lastNameLength'
  }
  if (!RegExp(/^[a-z]+$/i).test(value)) {
    helperText = 'common.errorMessages.lastNameAlphabeticOnly'
  }
  helperText = emptyField(value, helperText)
  return helperText
}

export const confirmPassword = (password, data) => {
  let helperText
  if (password !== data.confirmPassword) {
    helperText = 'common.errorMessages.passwordsDontMatch'
  }
  helperText = emptyField(password, helperText)
  return helperText
}
