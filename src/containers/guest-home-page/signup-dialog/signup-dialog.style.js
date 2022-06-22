export const style = {
  root: {
    maxWidth: { xs: '315px', sm: 'md', md: '800px', lg: 'lg' },
    mt: { xs: '50px', sm: 0 },
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
  h2: {
    marginBottom: '32px',
    fontSize: '32px',
    lineHeight: '48px'
  },
  form: {
    borderTop: { xs: '1px solid', sm: 'none' },
    borderColor: { xs: 'primary.100' },
    maxWidth: { xs: '320px', sm: '343px' },
    padding: {  xs: '30px 0 0 0', sm: '50px 60px 40px 80px', md: '10px 55px 0 95px' }
  }
}
