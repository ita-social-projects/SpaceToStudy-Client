import { Link } from 'react-router-dom'
import { routes } from '~/constants/routes'
import { Typography, Box, Button, IconButton } from '@mui/material'

import Logo from '~/containers/logo/Logo'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'

import PropTypes from 'prop-types'

const style = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0px',
    margin: { xs: '0', xl: 'auto' }, 
    maxWidth: 'xl',
    width: { xl: '100%' },
  },
  navBox: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
  },
  navItem: {
    paddingLeft: '20px',
    opacity: '1',
    textDecoration: 'none',
    '&::after': {
      content: '"/"',
      paddingLeft: '20px',
    },
    '&:last-child::after': {
      content: '""'
    },
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    '& *': {
      margin: '0 6px',
      color: 'primary.900',
    }
  },
  menuIcon: {
    display: { md: 'none' },
    marginRight: '11px',
  }
}

const Navbar = ({ navigationItems, children }) => {

  const navigationList = navigationItems.map(i => {
    return (
      <Typography
        component={ Link } key={ i[0] } sx={ style.navItem }
        to={ i[1] } variant="subtitle2"
      >
        { i[0] }
      </Typography>)
  })

  return (
    <Box sx={ style.header }>
      <Button component={ Link } sx={ { m: { xs: '10px', sm: '18px', md: '20px 32px' } } } to={ routes.home }>
        <Logo />
      </Button>
      
      <Box sx={ style.navBox }>
        { navigationList }
      </Box>

      <Box sx={ style.iconBox }>
        <IconButton sx={ { display: { xs: 'none', sm: 'inherit' } } }>
          <LanguageIcon />
        </IconButton>
        { children }
        <IconButton sx={ style.menuIcon }>
          <MenuIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default Navbar

Navbar.propTypes = {
  navigationItems: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired
}
