export const email = (value) => {
  let helperText
  if ( !RegExp(/^([a-z0-9_\.-]{2,20}\@[\da-z\.-]{3,15})$/).test( value )) helperText = 'login.errorMessages.emailValid'
  return helperText
}

export const password = (value) => {
  let helperText
  if (!RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).)\S/).test(value)) helperText = 'login.errorMessages.passwordValid'
  if (value.length < 6 || value.length > 30) helperText = 'login.errorMessages.passwordLength'
  return helperText
}
