import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'

const textStyles = {
  typography: { xs: 'subtitle2', md: 'button' },
  color: 'primary.700'
}

export const styles = {
  container: {
    maxWidth: '552px',
    pt: '10px',
    display: 'grid',
    rowGap: '5px',
    justifyContent: 'space-between',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 240px))'
  },
  itemWrapper: {
    display: 'flex',
    columnGap: '10px'
  },
  showMore: {
    mt: '5px',
    ml: { xs: '30px', md: '33px' },
    textDecoration: 'underline',
    cursor: 'pointer',
    ...textStyles
  },
  anchorOrigin: {
    vertical: 'top',
    horizontal: 'left'
  },
  paperProps: {
    p: '5px 15px',
    mr: '15px',
    boxShadow: commonHoverShadow
  },
  titleWithDescription: {
    wrapper: {
      display: 'flex',
      columnGap: '10px',
      gap: '5px',
      marginBottom: '32px'
    },
    title: {
      ...textStyles
    },
    description: {
      ...textStyles
    }
  }
}
