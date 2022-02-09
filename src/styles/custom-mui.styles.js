import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000'
    }
  },
  typography: {
    button: {
      textTransform: 'capitalize'
    }
  }
})

export default theme