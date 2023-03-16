export const styles = {
  root: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: 'start',
    gap: { xs: '12px', sm: '32px' },
    borderBottom: '1px solid',
    borderColor: 'primary.100',
    py: '20px'
  },
  coopDetails: { color: 'primary.500', typography: { xs: 'subtitle2', sm: 'button' } },
  description: { textAlign: 'start', display: 'flex', flexDirection: 'column', gap: '12px' },
  comment: { typography: { xs: 'caption', sm: 'body1' } },
  userInfo: {
    root: {
      display: 'flex',
      flexDirection: { sm: 'column' },
      minWidth: '130px',
      gap: '8px'
    },
    img: {
      width: { xs: '32px', sm: '48px' },
      height: { xs: '32px', sm: '48px' },
      border: '1px solid',
      borderRadius: '50%',
      borderColor: 'primary.900'
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      alignItems: 'start',
      mb: 0,
      m: 0
    },
    title: {
      display: 'flex',
      flexDirection: { sm: 'column' },
      columnGap: { xs: '12px' },
      mb: 0,
      m: 0,
      fontSize: 'subtitle2',
      textAlign: 'start'
    },
    description: {
      typography: 'overline',
      color: 'primary.500'
    }
  },
  rating: {
    backgroundColor: 'primary.50' 
  }
}
