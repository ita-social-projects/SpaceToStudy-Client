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
    },
    flex: 1
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
  },
  titleWithDescription: {
    wrapper: {
      textAlign: {
        md: 'left',
        xs: 'center'
      },
      mb: '32px'
    },
    title: {
      typography: {
        md: 'h2',
        sm: 'h3',
        xs: 'h4'
      },
      mb: '16px',
      lineHeight: {
        md: '61px'
      }
    },
    description: {
      typography: {
        md: 'subtitle1',
        sm: 'subtitle1',
        xs: 'subtitle2'
      }
    }
  }
}
