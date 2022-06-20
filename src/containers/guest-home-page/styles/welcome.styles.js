import welcomeBgMd from '~/assets/img/guest-home-page/welcomeBgMd.svg'
import welcomeBgSm from '~/assets/img/guest-home-page/welcomeBgSm.svg'
import welcomeBgXs from '~/assets/img/guest-home-page/welcomeBgXs.svg'
import { mainShadow } from '~/styles/app-theme/custom-shadows'

const gradient = 'radial-gradient(ellipse at top, rgba(192, 229, 228, 0.4), transparent 80%'

export const styles = {
  container: {
    flexDirection: 'column',
    minHeight: {
      md: '570px',
      sm: '319px',
      xs: '404px'
    },
    backgroundImage: {
      md: `url(${welcomeBgMd}), ${gradient})`,
      sm: `url(${welcomeBgSm}), ${gradient})`,
      xs: `url(${welcomeBgXs}), ${gradient})`,
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
    color: 'primary.900',
    textAlign: 'center',
  },
  getStartBtn: {
    padding: '16px 51px',
    boxShadow: mainShadow,
    textTransform: 'none'
  }
}
