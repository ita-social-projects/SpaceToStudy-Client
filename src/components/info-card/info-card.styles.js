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
    // marginBottom: {
    //   sm: '0px',
    //   xs: '24px'
    // },
    padding: '24px 24px 32px',
    backgroundColor: theme.palette.basic.white,
    boxShadow: theme.shadows.primary,
    borderRadius: '6px',
    '&:not(:last-child)': {
      marginBottom: {
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
