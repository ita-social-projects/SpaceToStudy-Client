export const loginUserData = { email: 'user@gmail.com', password: '123' }

export const signupUserData = {
  email: 'user@gmail.com',
  password: 'testest_1',
  confirmPassword: 'testest_1',
  firstName: 'John',
  lastName: 'Doe'
}

export const initialState = {
  userId: '',
  userRole: '',
  userStatus: 'active',
  authLoading: false,
  loading: true,
  pageLoad: false,
  error: '',
  isFirstLogin: true
}

export const stateAfterLogin = {
  userId: '62f4fa49d39c988e347d833f',
  userRole: 'student',
  userStatus: 'active',
  authLoading: false,
  loading: false,
  pageLoad: false,
  error: '',
  isFirstLogin: true
}

export const stateAfterSignup = {
  userId: '',
  userRole: '',
  userStatus: 'active',
  loading: false,
  pageLoad: false,
  authLoading: false,
  error: '',
  isFirstLogin: true
}

export const errorMessage = 'Request failed with status code 404'
export const errorCode = 'USER_NOT_REGISTERED'

export const accessToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjRmYTQ5ZDM5Yzk4OGUzNDdkODMzZiIsInJvbGUiOiJzdHVkZW50IiwiaXNGaXJzdExvZ2luIjp0cnVlLCJzdGF0dXMiOiJhY3RpdmUiLCJpYXQiOjE3MTcwMTYwMDcsImV4cCI6MTcxNzEwMjQwN30.YsoMtl_yRSD0aSVbrdzXhqUsM4Aip7BW6BnktcdulKc'
