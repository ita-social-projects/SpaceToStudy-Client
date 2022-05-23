const validationSchema = {
  email: {
    regExp: /^([a-z0-9_\.-]{2,20}\@[\da-z\.-]{3,15})$/,
    helperText: 'enter valid email'
  },
  password: {
    regExp: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,30})\S$/,
    helperText: 'password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces'
  }
}

export default validationSchema
