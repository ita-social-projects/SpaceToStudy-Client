export const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px',
    margin: { xs: '0', xl: 'auto' },
    maxWidth: 'xl',
    width: { xl: '100%' }
  },
  logoButton: { m: { xs: '10px', sm: '18px', md: '22px 6px 22px 24px', lg: '22px 24px' } },
  navList: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center'
  },
  navItemText: {
    color: 'primary.900',
    textDecoration: 'none'
  },
  navItem: {
    '&:last-child': {
      pr: 0
    },
    pl: '0',
    pr: { md: '8px', lg: '20px' },
    width: 'auto',
    '&::after': {
      content: '"/"',
      padding: { md: '0 0 3px 8px', lg: '0 0 3px 20px' }
    },
    '&:last-child::after': {
      content: '""'
    }
  }
}
