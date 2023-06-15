import welcomeBgMd from '~/assets/img/guest-home-page/welcomeBgMd.svg'
import welcomeBgSm from '~/assets/img/guest-home-page/welcomeBgSm.svg'
import welcomeBgXs from '~/assets/img/guest-home-page/welcomeBgXs.svg'

import { mainShadow } from '~/styles/app-theme/custom-shadows'

const gradient =
  'radial-gradient(ellipse at top, rgba(192, 229, 228, 0.4), transparent 80%'

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
      xs: `url(${welcomeBgXs}), ${gradient})`
    },
    background: 'center / contain no-repeat'
  },
  title: {
    maxWidth: '100%',
    marginBottom: '24px'
  },
  subtitle: {
    typography: {
      sm: 'body1',
      xs: 'body2'
    },
    px: '24px',
    maxWidth: { lg: '1000px', xs: '798px' },
    marginBottom: '32px',
    textAlign: 'center'
  },
  getStartBtn: {
    py: '16px',
    px: { lg: '60px', xs: '32px' },
    boxShadow: mainShadow
  }
}
