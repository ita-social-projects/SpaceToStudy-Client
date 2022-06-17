import theme from '~/styles/app-theme/custom-mui.styles'

export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '24px 24px 32px',
    textAlign: 'center',
    backgroundColor: theme.palette.basic.white,
    boxShadow: theme.shadows.primary,
    borderRadius: '6px'
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
