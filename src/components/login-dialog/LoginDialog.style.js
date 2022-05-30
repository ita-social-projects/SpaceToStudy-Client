const style = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    overflow:'auto',
    maxWidth: '593px',
    display: { xs: 'none', sm: 'none', md: 'flex' }
  },
  h2: { 
    marginBottom: '32px',
    fontSize: '40px', 
    lineHeight: '48px' 
  },
  form: { 
    maxWidth: '343px',
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
    padding: '18px 149px'
  },
  linesBox: {
    margin: '23px 0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  line: {
    display: 'flex',
    width: '34%', 
    height: '2px', 
    backgroundColor: 'primary.100'
  },
  google: {
    marginBottom: '16px',
    padding: '15px 77px'   
  },
  underlineText: {
    fontWeight: '500',
    textDecoration: 'underline',
  }
}

export default style
