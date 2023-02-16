import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'

const textStyles = {
  typography: { sm: 'subtitle2', md: 'subtitle3' },
  color: 'primary.700'
}

export const styles = {
  container: {
    maxWidth: '552px',
    width: '100%',
    display: { xs: 'block', sm: 'grid' },
    gridColumnGap: '60px',
    gridTemplateColumns: {
      sm: 'repeat(auto-fit, minmax(150px, 240px))'
    }
  },
  root: {
    display: 'flex',
    gap: '10px',
    pt: '10px',
    flex: 1
  },
  wrapper: {
    display: 'flex',
    gap: '5px'
  },
  title: {
    ...textStyles
  },
  description: {
    ...textStyles
  },
  showMore: {
    m: { xs: '5px 0 0 30px', md: '10px 0 0 33px' },
    textDecoration: 'underline',
    cursor: 'pointer',
    ...textStyles
  },
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  paperProps: {
    maxWidth: '552px',
    p: '5px 15px',
    mr: '15px',
    width: { sm: '100%' },
    boxShadow: commonHoverShadow
  }
}
