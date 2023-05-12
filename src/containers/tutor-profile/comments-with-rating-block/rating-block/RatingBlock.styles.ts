export const styles = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    width: '100%',
    columnGap: { sm: '30px', md: '80px' },
    alignItems: 'center',
    justifyContent: 'center',
    pt: { xs: '16px', sm: '32px' },
    borderTop: '1px solid',
    borderColor: 'primary.100'
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    gap: { xs: '12px', sm: '30px' },
    my: '12px'
  },
  linearProgress: {
    height: '12px',
    borderRadius: '6px',
    width: { md: '360px', sm: '240px', xs: '190px' },
    backgroundColor: 'primary.50',
    '& span': { backgroundColor: 'basic.yellow', borderRadius: '6px' }
  },
  typography: {
    typography: { xs: 'caption', sm: 'body2', md: 'body1' },
    minWidth: '55px'
  },
  progressBarRoot: { position: 'relative' },
  resetButton: {
    position: 'absolute',
    left: 0,
    typography: { xs: 'caption', sm: 'subtitle2', md: 'button' },
    cursor: 'pointer',
    fontWeight: { xs: 500 },
    color: 'primary.600'
  },
  rating: {
    stars: {
      '& .MuiRating-icon': {
        mx: '1px'
      }
    }
  }
}
