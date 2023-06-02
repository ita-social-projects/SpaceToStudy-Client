export const styles = {
  root: {
    flex: 1,
    p: '16px',
    boxSizing: 'border-box',
    minWidth: '260px',
    minHeight: { xs: '280px', sm: '340px' },
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  userInfo: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'space-between',
    width: '100%'
  },
  userProfileInfo: {
    name: {
      typography: { xs: 'button', sm: 'h6' },
      color: 'primary.700'
    }
  },
  priceWithStatus: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    gap: '6px'
  },
  price: {
    wrapper: {
      mt: '14px'
    },
    title: {
      textAlign: 'left',
      typography: { xs: 'button', sm: 'h6' },
      whiteSpace: 'nowrap',
      color: 'primary.700'
    },
    description: {
      typography: 'overline',
      textAlign: 'left'
    }
  },
  chipBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    flexWrap: 'wrap',
    gap: '8px',
    pt: '14px',
    borderTop: '1px solid',
    borderColor: 'primary.50'
  },
  chipLabel: {
    typography: 'overline',
    fontWeight: 500
  },
  title: {
    typography: { xs: 'body2', sm: 'body1' }
  }
}
