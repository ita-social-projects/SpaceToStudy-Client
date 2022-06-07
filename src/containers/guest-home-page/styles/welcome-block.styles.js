import theme from '~/styles/app-theme/custom-mui.styles'
import welcomeBgMd from '~/assets/img/guest-home-page/welcomeBgMd.svg'
import welcomeBgSm from '~/assets/img/guest-home-page/welcomeBgSm.svg'
import welcomeBgXs from '~/assets/img/guest-home-page/welcomeBgXs.svg'

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
    backgroundImage: {
      md: `url(${welcomeBgMd}), radial-gradient(ellipse closest-side, rgba(192, 229, 228, 0.4), transparent)`,
      sm: `url(${welcomeBgSm}), radial-gradient(ellipse closest-side, rgba(192, 229, 228, 0.4), transparent)`,
      xs: `url(${welcomeBgXs}), radial-gradient(ellipse closest-side, rgba(192, 229, 228, 0.4), transparent)`,
    },
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  },
  title: {
    maxWidth: '100%',
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
