import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxHeight: '580px',
    columnGap: 2,
    ...fadeAnimation
  },
  img: {
    borderRadius: '20px'
  },
  rightBox: {
    maxWidth: '360px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    pt: 2
  },
  btnsBox: {
    pt: '10px',
    mt: 'auto'
  }
}
