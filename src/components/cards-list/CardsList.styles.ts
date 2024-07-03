import {
  commonHoverShadow,
  commonShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  cardsContainer: {
    display: 'grid',
    justifyContent: 'center',
    gridTemplateColumns: {
      xs: 'repeat(1, minmax(264px, 1fr))',
      sm: 'repeat(2, minmax(264px, 1fr))',
      md: 'repeat(3, minmax(264px, 1fr))'
    },
    gridAutoRows: '112px',
    gridGap: '24px'
  },
  btn: {
    m: '32px auto 0',
    p: '16px 32px',
    boxShadow: commonShadow,
    '&:hover': {
      boxShadow: commonHoverShadow
    }
  },
  loaderContainer: {
    minHeight: '350px',
    display: 'flex'
  }
}
