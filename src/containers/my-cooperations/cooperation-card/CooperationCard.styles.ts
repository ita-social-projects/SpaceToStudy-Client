export const styles = {
  root: {
    p: '16px 20px',
    maxWidth: '368px',
    height: '100%',
    maxHeight: { xs: '306px', sm: '318px' },
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'primary.100',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px'
  },
  userInfo: {
    display: 'flex',
    pb: '14px',
    justifyContent: 'space-between',
    width: '100%',
    borderBottom: '1px solid',
    borderColor: 'primary.50'
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
  chipBox: { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  chipLabel: {
    typography: 'overline',
    fontWeight: 500
  },
  description: {
    typography: 'body2',
    color: 'primary.600',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    lineClamp: 5,
    WebkitBoxOrient: 'vertical',
    boxOrient: 'vertical',
    overflow: 'hidden'
  }
}
