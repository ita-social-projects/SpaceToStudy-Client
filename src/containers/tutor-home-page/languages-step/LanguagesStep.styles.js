import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    maxHeight: '580px',
    columnGap: 2,
    ...fadeAnimation
  },
  imgContainer: {
    flex: 1,
    maxWidth: '650px',
    display: 'flex',
    justifyContent: 'center'
  },
  img: {
    width: '100%',
    maxWidth: '580px',
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
