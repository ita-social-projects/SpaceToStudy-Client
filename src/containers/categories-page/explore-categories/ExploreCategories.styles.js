export const styles = {
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    mt: '80px'
  },
  sectionTitle: {
    typography: { sm: 'h4', xs: 'h5' }
  },
  sectionDescription: {
    typography: { sm: 'body1', xs: 'body2' }
  },
  showAllOffers: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    columnGap: '10px',
    color: 'primary.500',
    textDecoration: 'none',
    m: '0 45px 20px 0'
  },
  titleComp: {
    wrapper: {
      maxWidth: '1128px',
      margin: '0 auto',
      marginBottom: '32px',
      textAlign: 'center'
    },
    title: {
      typography: { sm: 'h4', xs: 'h5' },
      marginBottom: '16px'
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' }
    }
  }
}
