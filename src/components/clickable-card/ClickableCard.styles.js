import { commonHoverShadow, commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    maxWidth: '360px',
    p: '25px 32px',
    backgroundColor: 'basic.white',
    boxShadow: commonShadow,
    borderRadius: '6px',
    '&:hover': {
      boxShadow: commonHoverShadow
    }
  }
}
