export const style = {
  root: {
    maxWidth: { xs: '315px', sm: 'md', md: '800px', lg: 'lg' },
    mt: { sx: '200px', sm: 0 },
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  img: {
    overflow: 'auto',
    maxWidth: { sm: '300px', md: '593px' },
    minWidth: '340px',
    display: { xs: 'none', sm: 'none', md: 'flex' }
  },
  line: {
    height: '1px',
    backgroundColor: 'primary.100',
    mt: '6vh',
    mb: '5vh',
    display: { xs: 'flex', sm: 'none' }
  },
  h2: {
    marginBottom: '32px',
    fontSize: '32px',
    lineHeight: '48px'
  },
  form: {
    maxWidth: { xs: '320px', sm: '343px' },
    padding: { sm: '50px 60px 40px 80px', md: '10px 55px 0 95px' }
  }
}
