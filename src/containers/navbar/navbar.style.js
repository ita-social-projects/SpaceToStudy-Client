const style = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px',
    margin: { xs: '0', xl: 'auto' }, 
    maxWidth: 'xl',
    width: { xl: '100%' },
  },
  logoButton: { m: { xs: '10px', sm: '18px', md: '22px 24px' } },
  navList: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
  },
  navListText: { 
    color: 'primary.900',
    textDecoration: 'none',
  },
  navItem: {
    paddingLeft: '0',
    width: 'auto',
    '&::after': {
      content: '"/"',
      padding: '0 0 3px 20px',
    },
    '&:last-child::after': {
      content: '""'
    },
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
  },
  langIcon: { display: { xs: 'none', sm: 'inherit' } },
  menuIcon: {
    display: { md: 'none' },
    marginRight: '11px',
  }
}

export default style
