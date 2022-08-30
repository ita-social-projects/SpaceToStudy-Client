const style = {
  root: {
    maxWidth: { sm: 'lg' },
    mt: { xs: '56px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxHeight: { xs: 'calc(100vh - 56px)', sm: 'calc(100vh - 64px)' }
  },
  imgContainer: {
    maxWidth: '593px',
    maxHeight: 'inherit',
    display: { xs: 'none', md: 'flex' }
  },
  img: {
    objectFit: 'contain',
    width: '100%'
  },
  h2: {
    marginBottom: '32px',
    fontSize: '40px',
    lineHeight: '48px'
  },
  form: {
    maxHeight: 'inherit',
    boxSizing: 'border-box',
    overflow: 'auto',
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    maxWidth: { xs: '359px', sm: '534px', md: '439px', lg: '455px' },
    padding: { xs: '24px 8px', sm: '64px 96px', md: '40px 80px 40px 16px', lg: '56px 96px 56px 16px' }
  }
}

export default style
