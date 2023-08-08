import {
  commonHoverShadow,
  commonShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: (isClickable: boolean) => ({
    display: 'flex',
    padding: '20px 30px',
    textDecoration: 'none',
    backgroundColor: 'basic.white',
    boxShadow: commonShadow,
    borderRadius: '6px',
    '&:hover': isClickable && {
      cursor: 'pointer',
      boxShadow: commonHoverShadow
    }
  })
}
