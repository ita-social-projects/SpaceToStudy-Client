export const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '24px 24px 32px',
    textAlign: 'center',
    backgroundColor: 'basic.white',
    boxShadow: 'primary',
    borderRadius: '6px'
  },
  cardImg: {
    marginBottom: '24px'
  },
  cardTitle: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cardDescription: {
    marginBottom: '24px'
  },
  titleWithDescription: {
    wrapper: {
      margin: '0 auto 32px'
    },
    title: {
      typography: { md: 'h4', xs: 'h5' },
      marginBottom: '16px'
    },
    description: {
      typography: { md: 'body1', xs: 'body2' }
    }
  }
}
