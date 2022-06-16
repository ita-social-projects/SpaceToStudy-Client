export const email = (value) => {
  let helperText
  if (!RegExp(/^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/i).test(value)) {
    helperText = 'login.errorMessages.emailValid'
  }
  if (value === '') {
    helperText = 'signup.errorMessages.emptyField'
  }
  return helperText
}

export const password = (value) => {
  let helperText
  if (!RegExp(/^((?=\S*?[A-ZА-Я])(?=\S*?[a-zа-я])(?=\S*?[0-9]).)(?=\S*?[ -/:-@[-`{-~])\S/).test(value)) {
    helperText = 'login.errorMessages.passwordValid'
  }
  if (value.length < 8 || value.length > 25) {
    helperText = 'login.errorMessages.passwordLength'
  }
  if (value === '') {
    helperText = 'signup.errorMessages.emptyField'
  }
  return helperText
}
