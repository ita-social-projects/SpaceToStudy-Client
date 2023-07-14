export const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    p: 0,
    margin: { xs: 0, xl: 'auto' },
    maxWidth: '1800px',
    width: { xl: '100%' }
  },
  logoButton: {
    m: { xs: '10px', sm: '18px', md: '22px 6px 22px 24px', lg: '22px 24px' }
  },
  navList: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center'
  },
  navItemText: (isActive) => ({
    typography: 'subtitle2',
    whiteSpace: 'nowrap',
    color: 'primary.900',
    textDecoration: isActive ? 'underline' : 'none',
    '&:hover': {
      color: 'primary.500'
    },
    '&:focus': {
      textDecoration: 'underline'
    }
  }),
  divider: {
    color: 'primary.900',
    fontWeight: '500',
    px: '4px'
  }
}
