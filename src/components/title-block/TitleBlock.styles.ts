export const styles = {
  container: {
    justifyContent: 'space-between',
    backgroundColor: 'companyBlue',
    borderRadius: 2,
    px: { md: 7, sm: 3, xs: 3 },
    py: { md: 6, sm: 4, xs: 4 }
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
      mb: '32px'
    },
    title: {
      typography: { md: 'h4', xs: 'h5' },
      color: 'primary.900',
      mb: 1
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' },
      color: 'primary.900',
      mb: 6,
      flexBasis: { lg: '55%' }
    }
  }
}
