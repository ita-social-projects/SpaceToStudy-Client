import { emptyField, nameField } from './common'

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
  if (!RegExp(/^((?=\S*?[a-zа-я])(?=\S*?[0-9]).)(?=\S*?[ -/:-@[-`{-~])\S/).test(value)) {
    helperText = 'common.errorMessages.passwordValid'
  }
  if (value.length < 8 || value.length > 25) {
    helperText = 'common.errorMessages.passwordLength'
  }
  helperText = emptyField(value, helperText)
  return helperText
}

export const firstName = (value) => {
  return nameField(value)
}

export const lastName = (value) => {
  return nameField(value)
}

export const confirmPassword = (password, data) => {
  let helperText
  if (password !== data.confirmPassword) {
    helperText = 'common.errorMessages.passwordsDontMatch'
  }
  helperText = emptyField(password, helperText)
  return helperText
}
