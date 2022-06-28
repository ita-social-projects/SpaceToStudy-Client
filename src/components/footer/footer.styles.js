export const style = {
  footer: {
    backgroundColor: 'primary.900'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1128px',
    margin: '0 auto',
    padding: { xs:'16px', sm: '26px 20px' },
    '& > *': {
      flexBasis: '564px'
    }
  },
  links: {
    display: { xs:'flex', sm: 'block' },
    flexDirection: { xs:'column' },
    alignItems: { xs:'end' },
    '& > *': {
      color: 'primary.50',
      textDecoration: 'none',
      '&:nth-of-type(2n)::before': {
        content: { sm:'" • "', xs: 'none' },
        color: 'primary.100'
      }
    }
  },
}
