export const styles = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    rowGap: '24px',
    justifyContent: 'space-between',
    py: '24px'
  },
  link: {
    textDecoration: 'none',
    color: 'primary.50',
    typography: { xs: 'caption', md: 'subtitle2' },
    fontWeight: { xs: '500' },
    height: 'fit-content',
    '&:hover': {
      fontWeight: '600'
    }
  },
  socialLinks: {
    display: 'flex',
    flexDirection: { sm: 'column' },
    justifyContent: 'space-between',
    maxWidth: '80px',
    gap: '14px'
  },
  socialLink: { color: 'primary.50', height: '24px' },
  logo: { maxWidth: { xs: '110px', md: '150px' }, mb: { xs: '24px', sm: 0 } },
  linksWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2,auto)',
    columnGap: { xs: '40px', sm: '80px' },
    rowGap: '8px'
  },
  divider: { borderColor: 'primary.100' },
  copyRight: {
    textAlign: 'center',
    py: '14px',
    typography: { xs: 'caption', md: 'body2' }
  }
}
