export const styles = {
  container: {
    color: 'primary.900'
  },
  wrapper: {
    textAlign: 'start',
    m: '0 auto 40px',
    maxWidth: '744px',
  },
  firstItemWrapper: {
    backgroundColor: 'basic.grey',
    mt: '30px',
    mb: '70px',
    p: '30px 0 50px',
    borderRadius: '20px',
  },
  firstItemTitleStyle: { 
    typography: { md: 'h4', xs: 'h5' },
    mb: 0,
    pt: '20px',
  },
  titleStyles: {
    typography: { md: 'h5', xs: 'h5' },
    mb: '30px'
  },
  subtitleStyles: {
    typography: { xlg: 'subtitle1' },
    fontWeight: 600,
    mb: '15px',
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    '&::before': {
      content: '""',
      backgroundColor: 'primary.500', 
      minWidth: '8px',
      height: '8px',
      borderRadius: '50%',
      mr: '20px'
    }
  },
  descriptionStyles: {
    typography: { md: 'body1', xs: 'body2' }
  }
}
