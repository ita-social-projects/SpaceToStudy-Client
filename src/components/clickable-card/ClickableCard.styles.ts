import {
  commonHoverShadow,
  commonShadow
} from '~/styles/app-theme/custom-shadows'

export const styles = {
  card: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    p: '25px 32px',
    backgroundColor: 'basic.white',
    boxShadow: commonShadow,
    borderRadius: '6px',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: commonHoverShadow
    }
  },
  img: {
    mr: '24px',
    minWidth: '62px'
  },
  titleWithDescription: {
    margin: 0,
    mb: 0,
    textAlign: 'start'
  },
  title: {
    m: 0,
    typography: { xs: 'h6' }
  },
  description: {
    color: 'primary.500',
    typography: { xs: 'body2' }
  }
}
