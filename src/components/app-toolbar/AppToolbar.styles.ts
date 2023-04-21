import { commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: {
    backgroundColor: 'basic.white',
    display: 'flex',
    alignItems: 'center',
    boxShadow: commonShadow,
    mb: { xs: '20px', sm: '50px' },
    p: { xs: '10px 14px', sm: '30px 45px' }
  }
}
