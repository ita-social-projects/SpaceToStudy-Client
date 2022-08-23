import { fade } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    animation: `${fade} 0.5s ease-in-out`
  },
  img: {
    borderRadius: '20px',
    mr: 3,
    overflow: 'auto',
    display: { xs: 'none', md: 'flex' }
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '360px',
    pt: 12
  }
}
