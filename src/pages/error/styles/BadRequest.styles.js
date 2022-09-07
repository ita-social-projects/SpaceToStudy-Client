export const styles = {
  container: {
    display: 'flex',
    flexDirection: { md: 'row', xs: 'column' },
    alignItems: 'center',
    justifyContent: { md: 'space-between', xs: 'space-evenly' },
    rowGap: {
      sm: '75px',
      xs: '115px'
    },
    '& p': {
      textAlign: { md: 'left', sm: 'center' },
      fontWeight: 300
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
