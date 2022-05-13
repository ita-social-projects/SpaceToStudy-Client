import theme from '~/styles/app-theme/custom-mui.styles'
import desktopBg from '~/img/guest-home-page/desktopBg.svg'
import tabletBg from '~/img/guest-home-page/tabletBg.svg'
import mobileBg from '~/img/guest-home-page/mobileBg.svg'
import { blueGrey } from '@mui/material/colors'

export const WelcomeBlockStyles = {
  container: {
    paddingTop: '144px',
    paddingBottom: '206px',
    backgroundImage: `url(${ desktopBg })`,
    backgroundPosition: 'center -380px',
    backgroundRepeat: 'no-repeat',
    [theme.breakpoints.down('md')]: {
      paddingTop: '72px',
      paddingBottom: '80px',
      backgroundImage: `url(${ tabletBg })`,
      backgroundPosition: 'center -300px'
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '75px',
      backgroundImage: `url(${ mobileBg })`,
      backgroundPosition: 'center -260px'
    }
  },
  title: {
    'br:nth-of-type(1)': {
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    'br:nth-of-type(2)': {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'flex'
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  },
  h1: {
    marginBottom: '24px',
    color: theme.palette.primary[900],
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '40px',
      lineHeight: '47px'
    },
    [theme.breakpoints.down('sm')]: {
      fontWeight: 900,
      letterSpacing: '-0.5px'
    }
  },
  blue: {
    color: '#2B4680'
  },
  green: {
    color: '#3C835A',
    '&::after': {
      content: '""',
      marginLeft: '7px',
      border: `1px solid ${ theme.palette.primary[900] }`,
      background: theme.palette.primary[900],
      boxShadow: ' 0px 4px 5px rgba(144, 164, 174, 0.25), 0px 7px 10px rgba(144, 164, 174,' +
        ' 0.14), 0px 2px 15px rgba(144, 164, 174, 0.11)',
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    }
  },
  subtitle: {
    marginBottom: '32px',
    color: theme.palette.primary[900],
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      padding: '0px 100px',
      br: {
        display: 'none'
      }
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px 16px',
      fontSize: '14px',
      fontHeight: '21px',
      br: {
        display: 'none'
      }
    }
  },
  getStartBtn: {
    display: 'block',
    margin: '0px auto',
    padding: '16px 51px',
    color: '#fff',
    background: blueGrey[900],
    boxShadow: '0px 5px 6px -3px rgba(144, 164, 174, 0.2), 0px 9px 12px 1px rgba(144, 164, 174,' +
      ' 0.14), 0px 3px 16px 2px rgba(144, 164, 174, 0.12)',
    borderRadius: '4px',
    '&:hover': {
      background: blueGrey[900]
    }
  }
}
