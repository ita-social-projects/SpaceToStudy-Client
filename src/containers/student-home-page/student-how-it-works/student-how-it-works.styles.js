export const styles = {
  container: {
    backgroundColor: 'basic.white',
    display: 'block',
    textAlign: 'center',
    p: '35px 40px'
  },
  cardsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '35px',
    m: '50px 0 70px 0'
  },
  cardWrapper: {
    m: '0 auto',
    maxWidth: '239px'
  },
  cardImg: {
    maxHeight: '89px'
  },
  titleWithDescription: {
    wrapper: {
      mb: '32px',
      textAlign: 'center'
    },
    title: {
      typography: 'h6',
      mt: '25px',
      mb: '16px'
    },
    description: {
      typography: 'body2'
    }
  },
  sectionTitleComp: {
    title: {
      typography: { sm: 'h4', xs: 'h5' },
      mb: '16px'
    },
    description: {
      typography: { sm: 'body1', xs: 'body2' }
    }
  }
}
