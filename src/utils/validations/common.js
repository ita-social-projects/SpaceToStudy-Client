export const emptyField = (value, helperText) => {
  if (!value) {
    return 'common.errorMessages.emptyField'
  }
  return helperText
}

export const nameField = (value) => {
  return helperTextHandler(value, 'nameField')
}

export const textField = (min, max) => (value) => {
  if (value.length !== 0 && value.length < min) {
    return 'common.errorMessages.shortText'
  }
  if (value.length > max) {
    return 'common.errorMessages.longText'
  }
}

export const helperTextHandler = (value, marker, password, data) => {
  let helperText = ''

  const validations = {
    nameField: () => {
      if (value.length > 30) {
        helperText = 'common.errorMessages.nameLength'
      }
      if (!RegExp(/^[a-zа-яєії]+$/i).test(value)) {
        helperText = 'common.errorMessages.nameAlphabeticOnly'
      }
    },
    password: () => {
      if (!RegExp(/^(?=.*\d)(?=.*[a-zа-яєії])\S+$/i).test(value)) {
        helperText = 'common.errorMessages.passwordValid'
      }
      if (value.length < 8 || value.length > 25) {
        helperText = 'common.errorMessages.passwordLength'
      }
    },
    email: () => {
      if (!RegExp(/^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i).test(value)) {
        helperText = 'common.errorMessages.emailValid'
      }
    },
    confirmPassword: () => {
      if (password !== data.password) {
        helperText = 'common.errorMessages.passwordsDontMatch'
      }
    }
  }

  for (const validationsKey in validations) {
    if (marker === validationsKey) {
      validations[validationsKey](value)
    }
  }

  if (marker === 'confirmPassword') {
    return emptyField(password, helperText)
  }
  return emptyField(value, helperText)
}
