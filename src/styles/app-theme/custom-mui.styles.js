import { createTheme } from '@mui/material'

import palette from './app.pallete.js'
import appTypography from './app.typography'
import button from './app.button'

export const theme = createTheme({
  palette,
  typography: appTypography,
  components: {
    MuiButton: button
  },
})

export default theme
