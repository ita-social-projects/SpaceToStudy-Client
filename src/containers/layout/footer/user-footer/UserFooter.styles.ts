export const styles = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { sm: 'center' },
    justifyContent: 'space-between',
    py: '24px'
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '80px',
    gap: '14px'
  },
  socialLink: { color: 'primary.50', height: '24px' },
  logo: { maxWidth: { xs: '110px', md: '150px' } },
  linksWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  divider: { borderColor: 'primary.100', my: '6px' },
  copyRight: {
    textAlign: 'center',
    typography: { xs: 'caption', md: 'body2' }
  }
}
