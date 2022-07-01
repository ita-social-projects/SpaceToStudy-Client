export const style = {
  footer: {
    backgroundColor: 'primary.900'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    '& > *': {
      flexGrow: 1
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
