import theme from '~/styles/app-theme/custom-mui.styles'
import desktopBg from '~/assets/img/guest-home-page/desktopBg.svg'

export const WelcomeBlockStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '82px',
    padding: {
      md: '144px 10px 96px',
      xs: '75px 10px 80px'
    },
    backgroundImage: `url(${desktopBg})`,
    backgroundPosition: 'center',
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
    boxShadow: '0',
    textTransform: 'none'
  }
}
