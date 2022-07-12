import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  button: {
    position: 'fixed',
    right: '10px',
    bottom: '6px',
    cursor: 'pointer',
    backgroundColor: 'white',
    boxShadow: mainShadow,
    '&:hover': { backgroundColor: 'primary.50' }
  },
  icon: {
    fontSize: { xs: '24px', sm: '40px' }, 
    color: 'primary.900'
  }
}
