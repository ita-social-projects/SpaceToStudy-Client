export const styles = {
  container: {
    p: { xs: '100px 10px', sm: '56px', md: '70px' },
    maxWidth: '400px'
  },
  wrapper: { maxWidth: '630px' },
  mainTitle: { typography: 'h4' },

  form: { display: 'flex', flexDirection: 'column' },
  box: {
    margin: { xs: '0 auto', sm: 0 },
    padding: 4,
    textAlign: 'center',
    boxShadow: 'none',
    borderRadius: '8px'
  },
  button: {
    marginTop: '30px',
    backgroundColor: '#262738',
    textTransform: 'none'
  },

  titleWithDescription: {
    wrapper: {
      mb: '32px',
      textAlign: 'center'
    },
    title: {
      typography: 'h4',
      mb: '16px'
    },
    description: {
      typography: 'subtitle'
    }
  }
}
