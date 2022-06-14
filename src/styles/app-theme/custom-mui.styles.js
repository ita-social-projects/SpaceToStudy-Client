import { createTheme } from '@mui/material'

import palette from './app.pallete.js'
import appTypography from './app.typography'
import button from './app.button'
import svgicon from './app.svgicon'
import shadows from './app.shadows'


export const theme = createTheme({
  palette,
  typography: appTypography,
  components: {
    MuiSvgIcon: svgicon,
    MuiButton: button,
  },
  shadows
})
theme.shadows[0]=theme.shadows.primary[0]
theme.shadows[1]=theme.shadows.primary[0]
theme.shadows[4]=theme.shadows.primary[0]
export default theme
