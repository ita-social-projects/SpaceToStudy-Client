import theme from '~/styles/app-theme/custom-mui.styles'

export const whatCanYouDoStyles = {
  container: {
    my: {
      md: '164px',
      sm: '104px',
      xs: '82px'
    },
    textAlign: 'center'
  },
  title: {
    typography: {
      md: 'h3',
      xs: 'h4'
    },
    marginBottom: '16px',
    // fontSize: {
    //   md: '48px',
    //   sm: '36px',
    //   xs: '32px'
    // },
    // fontWeight: 700,
    // lineHeight: {
    //   md: '56px',
    //   sm: '44px',
    //   xs: '32px'
    // },
  },
  description: {
    marginBottom: {
      md: '40px',
      sm: '24px',
      xs: '16px'
    },
    // fontSize: {
    //   md: '18px',
    //   xs: '16px'
    // },
    // fontWeight: 400,
    // lineHeight: {
    //   md: '26px',
    //   xs: '24px'
    // },
  },
  cards: {
    display: 'flex',
    flexDirection: {
      sm: 'row',
      xs: 'column'
    },
    justifyContent: 'space-evenly',
    alignItems: {
      sm: 'inherit',
      xs: 'center',
    },
    boxSizing: 'border-box',
    maxWidth: '1124px',
    margin: '0 auto',
    py: {
      md: '52px',
      sm: '48px',
      xs: '32px'
    },
    backgroundColor: theme.palette.primary[50],
    borderRadius: '20px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    maxWidth: {
      md: '427px',
      xs: '343px',
    },
    padding: '24px',
    backgroundColor: theme.palette.basic.white,
    boxShadow: theme.shadows.primary,
    borderRadius: '6px',
    '&:first-of-type': {
      mb: {
        sm: '0px',
        xs: '24px'
      }
    }
  },
  cardImg: {
    marginBottom: '24px'
  },
  cardTitle: {
    typography: {
      md: 'h4',
      xs: 'h5'
    },
    marginBottom: '16px',
    // fontSize: {
    //   md: '30px',
    //   xs: '24px'
    // },
    // fontWeight: 600,
    // lineHeight: {
    //   md: '45px',
    //   xs: '32px'
    // },
  },
  cardDescription: {
    typography: {
      md: 'body1',
      xs: 'body2'
    },
    marginBottom: '24px',
    // fontSize: {
    //   md: '16px',
    //   xs: '14px'
    // },
    // fontWeight: 400,
    // lineHeight: {
    //   md: '24px',
    //   xs: '21px'
    // },
  }
}
