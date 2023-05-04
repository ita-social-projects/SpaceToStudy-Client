export const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  filterSection: {
    display: 'flex'
  },
  titleWithDescription: {
    wrapper: {
      mb: { xs: '20px', sm: '32px' },
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
