const { LOGIN_USER, LOGOUT_USER } = require('./user.types')

const loginUser = (user) => ({
  type: LOGIN_USER,
  payload: user
})

const logoutUser = () => ({
  type: LOGOUT_USER
})

export { loginUser, logoutUser }
