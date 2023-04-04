import {
  commonHoverShadow,
  commonShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: (isClickable: boolean) => ({
    display: 'flex',
    padding: '30px 20px',
    boxShadow: commonShadow,
    borderRadius: '6px',
    cursor: 'pointer',
    '&:hover': isClickable && {
      boxShadow: commonHoverShadow
    }
  })
}
