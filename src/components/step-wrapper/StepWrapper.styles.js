import { fadeAnimation } from '~/styles/app-theme/custom-animations'

const btnStyle = {
  padding: '10px 20px',
  display: 'flex',
  columnGap: 1
}

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
    alignItems: { xs: 'center', sm: 'flex-start' },
    width: { sm: '107px' },
    borderBottom: { sm: '1px solid' },
    borderColor: { sm: 'primary.500' },
    cursor: 'pointer',
    p: { xs: '6px 8px', sm: '0 0 14px 0' }
  },
  activeTab: {
    color: 'text',
    fontWeight: 600,
    borderBottom: { sm: '3px solid' },
    borderColor: { sm: 'primary.500' },
    p: { xs: '6px 8px', sm: '0 0 14px 0' },
    backgroundColor: { xs: 'basic.grey', sm: 'transparent' },
    borderRadius: { xs: '5px', sm: '0' },
    ...fadeAnimation
  },
  steps: {
    display: 'flex',
    justifyContent: { xs: 'center', md: 'end', sm: 'center' },
    flexWrap: 'wrap',
    columnGap: '1px'
  },
  stepContent: {
    display: { xs: 'flex', sm: 'block' },
    justifyContent: 'center',
    flex: 1,
    mt: { xs: '24px', sm: '30px' }
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: '10px',
    maxHeight: '40px'
  },
  btn: btnStyle,
  finishBtn: {
    ...btnStyle,
    minWidth: '96px'
  }
}
