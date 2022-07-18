export const styles = {
  container: {
    display: 'flex',
    flexDirection: { md: 'row', xs: 'column' },
    alignItems: 'center',
    columnGap: 8,
    rowGap: 9,
    pt: { md: 10, xs: 6 },
    '& p': {
      textAlign: { md: 'left', sm: 'center' },
      fontWeight: 400
    }
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: { md: 'start', xs: 'center' },
    px: { md: 0, sm: 15 }
  },
  img: {
    width: '100%'
  }
}
