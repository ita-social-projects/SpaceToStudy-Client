import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '485px',
    ...fadeAnimation
  },
  imgContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    padding: '0 122px 52px 0'
  },
  img: {
    width: '100%'
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: '0 1 435px'
  }
}
