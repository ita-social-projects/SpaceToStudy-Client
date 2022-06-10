import theme from '~/styles/app-theme/custom-mui.styles'

export const whatCanYouDoStyles = {
  container: {
    my: {
      md: '164px',
      sm: '104px',
      xs: '82px'
    },
    textAlign: 'center'
  },
  title: {
    typography: {
      md: 'h3',
      xs: 'h4'
    },
    marginBottom: '16px',
  },
  description: {
    marginBottom: {
      md: '40px',
      sm: '24px',
      xs: '16px'
    },
  },
  cards: {
    display: 'flex',
    flexDirection: {
      sm: 'row',
      xs: 'column'
    },
    justifyContent: 'space-evenly',
    alignItems: {
      sm: 'inherit',
      xs: 'center',
    },
    boxSizing: 'border-box',
    maxWidth: '1124px',
    margin: '0 auto',
    py: {
      md: '52px',
      sm: '48px',
      xs: '32px'
    },
    backgroundColor: theme.palette.primary[50],
    borderRadius: {
      md: '20px',
      xs: '16px'
    }
  }
}
