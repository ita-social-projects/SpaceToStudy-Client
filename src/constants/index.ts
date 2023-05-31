import { AlertColor } from '@mui/material/Alert'

export const s2s = 's2s'

export const accessToken = 'accessToken'

export const student = 'student'
export const tutor = 'tutor'
export const admin = 'admin'

export const login = 'login'
export const signup = 'signup'

export const snackbarVariants: { [key: string]: AlertColor } = {
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning'
}

export const myProfilePath = '/tutor/myProfile' || '/student/myProfile'

export const defaultResponses = {
  array: [],
  object: {}
}

export const itemsLoadLimit = {
  desktop: 12,
  tablet: 12,
  mobile: 6,
  default: 12
}
