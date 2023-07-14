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
  coopDetails: {
    color: 'primary.500',
    typography: { xs: 'subtitle2', sm: 'button' }
  },
  description: {
    textAlign: 'start',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  comment: { typography: { xs: 'caption', sm: 'body1' } },
  userInfo: {
    root: {
      flexDirection: { sm: 'column' },
      alignItems: { xs: 'center', sm: 'start' },
      minWidth: '130px',
      gap: { xs: '10px', sm: '4px' }
    },
    avatar: {
      width: { xs: '34px', sm: '48px' },
      height: { xs: '34px', sm: '48px' },
      name: {
        typography: { xs: 'caption', sm: 'subtitle2' }
      },
      date: {
        typography: 'overline'
      }
    }
  },
  rating: {
    backgroundColor: 'primary.50'
  }
}
