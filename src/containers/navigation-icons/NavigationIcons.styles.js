export const styles = {
  iconBox: {
    mr: { xs: '14px', sm: '20px', md: '32px' },
    display: 'flex',
    alignItems: 'center',
    '&>.MuiIconButton-root': {
      p: { sm: '12px', md: '7px', lg: '12px' }
    }
  },
  langIcon: { display: { xs: 'none', sm: 'inherit' } },
  menuIcon: { display: { md: 'none' } },
  loginButton: {
    display: { xs: 'none', md: 'inherit' },
    margin: '18px 10px'
  },
  loginIcon: { display: { md: 'none' } },
  studentIcons: { display: { xs: 'none', md: 'inherit' } },
  accountMenu: {
    '& .MuiPaper-root': {
      borderRadius: 0
    },
    left: { xs: '15px', sm: '20px', md: '32px' }
  },
  menuItem: {
    minWidth: '300px',
    pl: 5,
    py: 2,
    fontSize: '18px'
  }
}
