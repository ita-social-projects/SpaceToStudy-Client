export const styles = {
  container: {
    justifyContent: 'space-between',
    backgroundColor: 'companyBlue',
    borderRadius: 2,
    px: { md: 10, sm: 6, xs: 2 },
    py: { md: 6, sm: 4, xs: 5 }
  },
  info: {
    flexBasis: { lg: '55%' }
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: { sm: 'nowrap', xs: 'wrap' }
  },
  titleWithDescription: {
    wrapper: {
      textAlign: 'left',
      marginBottom: '32px'
    },
    title: {
      typography: 'h4',
      color: 'primary.900',
      mb: 1
    },
    description: {
      typography: 'subtitle1',
      color: 'primary.900',
      mb: 6
    }
  }
}
