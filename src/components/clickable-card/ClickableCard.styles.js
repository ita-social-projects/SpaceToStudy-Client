import { commonHoverShadow, commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  card: {
    flexGrow: '1',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    p: '25px 32px',
    backgroundColor: 'basic.white',
    boxShadow: commonShadow,
    borderRadius: '6px',
    '&:hover': {
      boxShadow: commonHoverShadow
    }
  }
}
