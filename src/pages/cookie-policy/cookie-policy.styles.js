export const styles = {
  container: {
    color: 'primary.900'
  },
  wrapper: {
    m: '0 auto',
    textAlign: 'start',
    mb: '50px',
    maxWidth: '744px',
  },
  firstItemWrapper: {
    textAlign: 'center',
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
    mb: '25px',
  },
  subtitleStyles: {
    typography: { xlg: 'subtitle1' },
    fontWeight: 600,
    my: '15px',
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
