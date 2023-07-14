export const styles = {
  footer: {
    backgroundColor: 'primary.900',
    color: 'primary.50',
    marginTop: 'auto'
  },
  container: {
    display: 'flex',
    flexDirection: { xs: 'column-reverse', sm: 'row' },
    justifyContent: { xs: 'space-between', sm: 'space-around' },
    alignItems: 'center',
    py: { xs: '12px', sm: '26px' }
  },
  links: {
    display: { xs: 'flex', sm: 'block' },
    flexDirection: { xs: 'row', sm: 'column' },
    pb: { xs: 1, sm: 0 },
    '& > *': {
      color: 'primary.50',
      textDecoration: 'none',
      '&:nth-of-type(2n)::before': {
        content: '" • "',
        px: 1,
        color: 'primary.100'
      }
    }
  }
}
