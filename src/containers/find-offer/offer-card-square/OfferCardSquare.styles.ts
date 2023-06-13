const ellipsisTextStyle = (linesCount: number) => ({
  display: '-webkit-box',
  WebkitLineClamp: linesCount,
  lineClamp: linesCount,
  WebkitBoxOrient: 'vertical',
  boxOrient: 'vertical',
  overflow: 'hidden'
})

export const styles = {
  container: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    justifyContent: 'space-between'
  },
  userInfo: {
    root: {
      alignItems: 'center'
    },
    avatar: {
      height: '80px',
      width: '80px'
    }
  },
  description: {
    ...ellipsisTextStyle(2),
    typography: 'midTitle',
    fontWeight: 600,
    color: 'primary.700'
  },
  iconButton: {
    color: 'basic.black',
    position: 'absolute',
    top: 0,
    right: 0
  },
  chipContainer: {
    mb: '16px'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mt: 'auto',
    mb: '16px'
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left'
    },
    title: {
      typography: 'h6'
    },
    description: {
      typography: 'caption'
    }
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }
}
