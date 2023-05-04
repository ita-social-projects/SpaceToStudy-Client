export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '488px',
    mx: 'auto',
    my: { xs: '50px', sm: '75px', md: '100px' }
  },
  imgTitleDescription: {
    root: { textAlign: 'center' },
    titleWithDescription: {
      title: {
        typography: 'h5',
        m: { xs: '10px 0', sm: '25px 0 10px' }
      },
      text: {
        typography: { xs: 'body2', sm: 'body1' }
      }
    }
  },
  button: {
    mt: '33px'
  }
}
