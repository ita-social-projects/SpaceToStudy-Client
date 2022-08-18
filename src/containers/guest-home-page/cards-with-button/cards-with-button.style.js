export const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  left: {
    box: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: { sm: 'row-reverse', xs: 'row' }
    },
    clearBox: {
      display: { xs: 'none', sm: 'flex' },
      flexBasis: '466px'
    },
    wrapper: {
      pt: '5px',
      flexBasis: '466px'
    },
    image: {
      m: { sm: '0px 60px 0px 60px', xs: '0px 20px 0px 20px' },
      flexGrow: '0'
    },
    title: {
      marginBottom: '8px',
      textAlign: { sm: 'end', xs: 'start' }
    },
    description: {
      textAlign: { sm: 'end', xs: 'start' }
    }
  },
  right: {
    box: {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'row'
    },
    clearBox: {
      display: { xs: 'none', sm: 'flex' },
      flexBasis: '466px'
    },
    wrapper: {
      pt: '5px',
      flexBasis: '466px'
    },
    image: {
      m: { sm: '0px 60px 0px 60px', xs: '0px 20px 0px 20px' },
      flexGrow: '0'
    },
    title: {
      marginBottom: '8px',
      textAlign: 'start'
    },
    description: {
      textAlign: 'start'
    }
  }
}
