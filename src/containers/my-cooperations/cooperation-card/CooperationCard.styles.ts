export const styles = {
  root: {
    p: '16px 20px',
    maxWidth: { xs: '290px', sm: '320px' },
    maxHeight: { xs: '290px', sm: '320px' },
    height: '100%',
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'primary.100',
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
  imgTitleDescription: {
    img: {
      width: '48px',
      height: '48px',
      border: '1px solid',
      borderRadius: '50%',
      borderColor: 'primary.900'
    },
    titleWithDescription: {
      title: {
        typography: { xs: 'button', sm: 'h6' },
        textAlign: 'start',
        color: 'primary.700'
      },
      description: {
        typography: 'body2',
        color: 'primary.400'
      }
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
