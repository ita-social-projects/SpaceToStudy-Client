import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '40px',
    height: { sm: '485px' },
    ...fadeAnimation
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '440px',
    width: '100%',
    aspectRatio: '1',
    border: '2px dashed',
    borderColor: 'primary.200',
    borderRadius: '20px',
    mt: { xs: '20px', sm: '20px', md: '0px' }
  },
  img: {
    width: '100%',
    borderRadius: '20px',
    mt: { xs: '20px', sm: '20px', md: '0px' }
  },
  imgContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '440px',
    width: '100%',
    flex: 1,
    pb: { xs: '16px', sm: '26px', md: '52px' }
  },
  rigthBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: '432px',
    m: { md: 0, xs: '0 auto' },
    pt: 0
  },
  description: {
    mb: '20px'
  },
  rootDrag: {
    border: '2px primary',
    borderColor: 'primary.900'
  }
}
