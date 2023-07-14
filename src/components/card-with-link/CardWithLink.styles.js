export const styles = {
  img: {
    width: '100%',
    alignSelf: 'center',
    mr: '24px',
    maxWidth: '62px',
    maxHeight: '62px'
  },
  titleWithDescription: {
    wrapper: {
      minWidth: '110px',
      margin: 0,
      mb: 0,
      lineHeight: '24px',
      textAlign: 'start'
    },
    title: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      color: 'basic.black',
      typography: { xs: 'h6' },
      m: 0
    },
    description: {
      typography: { xs: 'body2' },
      color: 'primary.500'
    }
  }
}
