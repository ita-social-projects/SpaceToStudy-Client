export const firstName = (value) => {
  let helperText
  if (value.length > 30) {
    helperText = 'signup.errorMessages.firstNameLength'
  }
  if (!RegExp(/^[a-z]+$/i).test(value)) {
    helperText = 'signup.errorMessages.firstNameAlphabeticOnly'
  }
  if (value === '') {
    helperText = 'signup.errorMessages.emptyField'
  }
  return helperText
}

export const lastName = (value) => {
  let helperText
  if (value.length > 30) {
    helperText = 'signup.errorMessages.lastNameLength'
  }
  if (!RegExp(/^[a-z]+$/i).test(value)) {
    helperText = 'signup.errorMessages.lastNameAlphabeticOnly'
  }
  if (value === '') {
    helperText = 'signup.errorMessages.emptyField'
  }
  return helperText
}

export const confirmPassword = (password, confirmPassword) => {
  let helperText
  if (password !== confirmPassword) {
    helperText = 'signup.errorMessages.passwordsDontMatch'
  }
  if (confirmPassword === '') {
    helperText = 'signup.errorMessages.emptyField'
  }
  return helperText
}
