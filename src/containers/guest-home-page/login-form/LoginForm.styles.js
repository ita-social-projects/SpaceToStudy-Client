export const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: { sm: '340px' }
  },
  loginOptionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '40px',
    p: '0px 5px',
    mb: '10px'
  },
  input: {
    maxWidth: '343px'
  },
  loginButton: {
    width: '100%',
    py: '14px'
  },
  checkboxLabel: {
    mr: 0,
    '& .MuiFormControlLabel-label': {
      typography: 'body2'
    }
  },
  forgotPass: {
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'primary.900',
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:focus': {
      outline: '2px solid',
      borderRadius: '2px'
    }
  }
}
