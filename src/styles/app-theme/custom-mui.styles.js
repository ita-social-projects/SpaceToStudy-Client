import { createTheme } from '@mui/material/styles'

import palette from './app.pallete'
import appTypography from './app.typography'
import button from './app.button'
import tooltip from './app.tooltip'
import table from './app.table.js'
import { svgIcon } from './app.svgicon'
import { checkbox } from './app.checkbox'
import { textField } from './app.textfield.js'
import { menuItem } from './app.menu-item'
import { menuList } from './app.menu-list'
import { select } from './app.select'

export const theme = createTheme({
  palette,
  typography: appTypography,
  components: {
    MuiSvgIcon: svgIcon,
    MuiButton: button,
    MuiCheckbox: checkbox,
    MuiTextField: textField,
    MuiSelect: select,
    MuiTooltip: tooltip,
    MuiMenuItem: menuItem,
    MuiMenu: menuList,
    MuiTableRow: table
  }
})
