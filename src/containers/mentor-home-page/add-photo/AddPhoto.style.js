import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    ...fadeAnimation
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '645px',
    width: '100%',
    aspectRatio: '1',
    border: 'dashed',
    borderColor: 'primary.200',
    borderRadius: '20px',
    mr: 3
  },
  img: {
    width: '100%',
    borderRadius: '20px'
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '360px',
    pt: 12
  },
  description: {
    mb: 5
  },
  imgContainer: {
    maxHeight: '648px',
    maxWidth: '648px',
    mr: 3
  }
}
