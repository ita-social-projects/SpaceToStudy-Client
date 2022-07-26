export const styles = {
  container: {
    display: 'flex',
    flexDirection: { md: 'row', xs: 'column' },
    alignItems: 'center',
    justifyContent: { md: 'space-between', xs: 'space-evenly' },
    height: '90vh',
    '& p': {
      textAlign: { md: 'left', sm: 'center' },
      fontWeight: 400
    }
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { md: 'start', xs: 'center' },
    maxWidth: '400px'
  },
  img: {
    maxWidth: { sm: '590px', xs: '320px' },
    overflow: 'auto'
  }
}
