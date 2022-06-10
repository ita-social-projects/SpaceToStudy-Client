import theme from '~/styles/app-theme/custom-mui.styles'

export const cardStyles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    maxWidth: {
      md: '427px',
      xs: '343px',
    },
    padding: '24px',
    backgroundColor: theme.palette.basic.white,
    boxShadow: theme.shadows.primary,
    borderRadius: '6px',
    '&:first-of-type': {
      mb: {
        sm: '0px',
        xs: '24px'
      }
    }
  },
  cardImg: {
    marginBottom: '24px'
  },
  cardTitle: {
    typography: {
      md: 'h4',
      xs: 'h5'
    },
    marginBottom: '16px',
  },
  cardDescription: {
    typography: {
      md: 'body1',
      xs: 'body2'
    },
    marginBottom: '24px',
  }
}
