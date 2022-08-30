export const style = {
  form: {
    maxWidth: { xs: '315px', sm: '343px' },
    padding: { sm: '50px 80px', md: '0' }
  },
  input: {
    maxWidth: '343px'
  },
  checkboxContainer: {
    margin: '25px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  checkboxLabel: {
    '& .MuiFormControlLabel-label': {
      typography: 'subtitle2'
    }
  },
  loginButton: {
    width: '100%',
    py: '18px'
  },
  forgotPass: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  }
}
