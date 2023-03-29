import { commonHoverShadow, commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: (isClickable) => ({
    display: 'flex',
    padding: '30px 20px',
    boxShadow: commonShadow,
    borderRadius: '6px',
    '&:hover': isClickable && {
      boxShadow: commonHoverShadow
    }
  })
}
