import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '32px',
    ...fadeAnimation
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '580px',
    width: '100%',
    aspectRatio: '1',
    border: 'dashed',
    borderColor: 'primary.200',
    borderRadius: '20px'
  },
  img: {
    width: '100%',
    maxWidth: '580px',
    borderRadius: '20px'
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: '0 2 360px',
    pt: 12
  },
  description: {
    mb: 5
  },
  imgContainer: {
    flex: 1,
    maxWidth: '650px',
    display: 'flex',
    justifyContent: 'center'
  }
}
