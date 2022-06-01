import theme from '~/styles/app-theme/custom-mui.styles'
import welcomeBg from '~/assets/img/guest-home-page/welcomeBg.svg'

export const welcomeBlockStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '80px',
    minHeight: {
      md: '570px',
      sm: '319px',
      xs: '404px'
    },
    backgroundImage: `url(${welcomeBg}), radial-gradient(ellipse closest-side, rgba(192, 229, 228, 0.4), transparent)`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  title: {
    marginBottom: '24px',
  },
  subtitle: {
    typography: {
      sm: 'subtitle1',
      xs: 'body2'
    },
    maxWidth:  '798px',
    marginBottom: '32px',
    color: theme.palette.primary[900],
    textAlign: 'center',
  },
  getStartBtn: {
    padding: '16px 51px',
    boxShadow: theme.shadows.primary,
    textTransform: 'none'
  }
}
