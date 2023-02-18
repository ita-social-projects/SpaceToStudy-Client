import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  root: {
    display: { xs: 'flex' },
    flexDirection: { xs: 'column' },
    height: { xs: '100vh', sm: 'auto' },
    p: { lg: '50px 90px', sm: '40px 50px', xs: '40px 15px' }
  },
  defaultTab: {
    display: 'flex',
    justifyContent: 'center',
    width: '107px',
    borderBottom: '1px solid',
    borderColor: 'primary.500',
    cursor: 'pointer'
  },
  activeTab: {
    color: 'text',
    fontWeight: 600,
    borderBottom: '3px solid',
    pb: '14px',
    ...fadeAnimation
  },
  steps: {
    display: 'flex',
    justifyContent: { md: 'end', sm: 'center' },
    flexWrap: 'wrap',
    columnGap: '1px'
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: '10px'
  },
  btn: {
    padding: '10px 20px',
    display: 'flex',
    columnGap: 1
  }
}
