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
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '16px 48px',
          marginTop: '24px'
        },
      },
    },
  },
})

export default theme