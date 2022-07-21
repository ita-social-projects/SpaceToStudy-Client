export const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: {
      md: 'row',
      xs: 'column'
    },
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: {
      sm: '75px',
      xs: '115px'
    }
  },
  errorInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: {
      md: 'start',
      xs: 'center'
    },
    maxWidth: {
      md: '360px',
      xs: '530px'
    }
  },
  titleWithDescr: {
    textAlign: {
      md: 'left',
      xs: 'center'
    }
  },
  title: {
    typography: {
      md: 'h2',
      sm: 'h3',
      xs: 'h4'
    }
  },
  description: {
    typography: {
      sm: 'body1',
      xs: 'body2'
    }
  },
  errorImage: {
    maxWidth: '100%',
    overflow: 'auto'
  }
}
