export const loginUserData = { email: 'user@gmail.com', password: '123' }

export const signupUserData = {
  email: 'user@gmail.com',
  password: '123',
  confirmPassword: '123',
  firstName: 'John',
  lastName: 'Doe'
}

export const initialState = {
  userId: '',
  userRole: '',
  userEmail: '',
  loading: false,
  error: ''
}

export const stateAfterLogin = {
  userId: '12345',
  userRole: 'student',
  userEmail: 'johndoe@gmail.com',
  loading: false,
  error: ''
}

export const stateAfterSignup = {
  userId: '',
  userRole: '',
  loading: false,
  userEmail: 'johndoe@gmail.com',
  error: ''
}

export const userEmail = 'johndoe@gmail.com'

export const errorMessage = 'Request failed with status code 404'

export const accessToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NTM4MjcxMDcsImV4cCI6MTY4NTM2MzEwNywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMTIzNDUiLCJyb2xlIjoic3R1ZGVudCJ9.J8HqR5AbIeFD6xe4ywlSSsltQ3X8dhjRaiqUVlDBGe4'
