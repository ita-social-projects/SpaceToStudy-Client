const style = {
  root: {
    maxWidth: { xs: '315px', sm: 'lg' },
    mt: { xs: '55px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  img: {
    overflow: 'auto',
    maxWidth: '593px',
    minWidth: '420px',
    display: { xs: 'none', sm: 'none', md: 'flex' }
  },
  h2: {
    marginBottom: '32px',
    fontSize: '40px',
    lineHeight: '48px'
  },
  form: {
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    maxWidth: { xs: '320px', sm: '343px' },
    padding: { xs: '30px 0 0 0', sm: '50px 80px', md: '0' }
  }
}

export default style
