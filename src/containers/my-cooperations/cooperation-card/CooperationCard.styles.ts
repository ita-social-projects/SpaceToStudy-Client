const cutText = (lines: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  lineClamp: lines,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export const styles = {
  root: {
    p: '16px 20px',
    maxWidth: '368px',
    maxHeight: '340px',
    height: '100%',
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'primary.100',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  userInfo: {
    display: 'flex',

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
    flexWrap: 'wrap',
    gap: '6px',
    pt: '12px',
    borderTop: '1px solid',
    borderColor: 'primary.50'
  },
  chipLabel: {
    typography: 'overline',
    fontWeight: 500
  },
  description: {
    typography: 'body2',
    color: 'primary.600',
    ...cutText(5)
  },
  title: {
    typography: 'button',
    minHeight: '48px',
    ...cutText(2)
  }
}
