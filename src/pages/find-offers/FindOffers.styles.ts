export const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
    mt: '80px'
  },
  filterSection: {
    display: 'flex'
  },
  titleWithDescription: {
    wrapper: {
      mb: '32px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' }
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.500'
    }
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}
