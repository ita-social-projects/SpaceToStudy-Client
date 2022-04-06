import { createTheme } from '@mui/material'
import palette from './app.pallete.js'
import appTypography from './app.typography'

export const theme = createTheme({
  palette,
  typography: appTypography,
})

export default theme
