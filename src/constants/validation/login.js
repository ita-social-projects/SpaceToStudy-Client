const validationSchema = {
  email: (value) => {
    let isValid = { error: false, helperText: '' }
    if ( !RegExp(/^([a-z0-9_\.-]{2,20}\@[\da-z\.-]{3,15})$/).test( value )) {
      isValid = {
        error: true,
        helperText: 'login.errorMessages.emailValid'
      }
    } 
    if (value.length < 7 || value.length > 30) {
      isValid = {
        error: true,
        helperText: 'login.errorMessages.emailLength'
      }
    }
    return isValid
  },
  password: (value) => {
    let isValid = { error: false, helperText: '' }
    if (!RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).)\S/).test(value)) {
      isValid = {
        error: true,
        helperText: 'login.errorMessages.passwordValid'
      }
    }
    if (value.length < 6 || value.length > 30) {
      isValid = {
        error: true,
        helperText: 'login.errorMessages.passwordLength'
      }
    }
    return isValid
  },
}

export default validationSchema
