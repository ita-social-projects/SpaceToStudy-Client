const style = {
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
    padding: { xs:'18px 134px' , sm:'18px 149px' }
  },
  underlineText: {
    fontWeight: '500',
    textDecoration: 'underline',
  }
}

export default style
