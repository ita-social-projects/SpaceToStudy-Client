import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  root: {
    display: 'flex',
    justifyContent: 'end',
    position: 'sticky',
    bottom: '0',
  },
  button: {
    m: { xs: '0 8px 8px 0', md: '0 10px 10px 0', lg: '0 20px 20px 0' },
    cursor: 'pointer',
    backgroundColor: 'white',
    boxShadow: mainShadow,
    '&:hover': { backgroundColor: 'primary.50' }
  },
  icon: {
    fontSize: '24px', 
    color: 'primary.900'
  }
}
