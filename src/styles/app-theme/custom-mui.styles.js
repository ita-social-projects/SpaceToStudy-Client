import { createTheme } from '@mui/material/styles'

import palette from './app.pallete.js'
import appTypography from './app.typography'
import button from './app.button'
import tooltip from './app.tooltip'
import { svgIcon } from './app.svgicon'
import { checkbox } from './app.checkbox'
import { textField } from './app.textfield.js'

export const theme = createTheme({
  palette,
  typography: appTypography,
  components: {
    MuiSvgIcon: svgIcon,
    MuiButton: button,
    MuiCheckbox: checkbox,
    MuiTextField: textField,
    MuiTooltip: tooltip
  }
})
