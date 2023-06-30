const hideOnMobile = { display: { xs: 'none', md: 'inherit' } }

export const styles = {
  iconBox: {
    mr: { xs: '14px', sm: '20px', md: '32px' },
    display: 'flex',
    alignItems: 'center',
    '&>.MuiIconButton-root': {
      p: { sm: '12px', md: '7px', lg: '12px' }
    }
  },
  showOnlyOnMobile: { display: { md: 'none' }, color: 'primary.900' },
  loginButton: {
    ...hideOnMobile,
    ml: '12px'
  },
  studentIcons: { ...hideOnMobile, color: 'primary.900' }
}
