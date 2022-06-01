const style = {
  root: {
    maxWidth: { xs: '315px', sm: 'lg' },
    mt: { sx: '200px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    overflow:'auto',
    maxWidth: '593px',
    minWidth: '420px',
    display: { xs: 'none', sm: 'none', md: 'flex' }
  },
  hr: {
    mt: 7,
    mb: 5,
    display: { xs: 'flex', sm: 'none' }
  },
  h2: { 
    marginBottom: '32px',
    fontSize: '40px', 
    lineHeight: '48px' 
  },
  form: { 
    maxWidth: { xs: '320px', sm: '343px' },
    padding: { sm: '50px 80px', md: '0' }
  }
}

export default style
