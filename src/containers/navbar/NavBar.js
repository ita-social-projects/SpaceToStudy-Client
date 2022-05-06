import { Link } from 'react-router-dom'
import { routes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'
import { Typography, Box, Button, IconButton, List, ListItem  } from '@mui/material'

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
  navList: {
    display: { xs: 'none', md: 'flex' },
    alignItems: 'center',
  },
  navItem: {
    paddingLeft: '0',
    width: 'auto',
    '&::after': {
      content: '"/"',
      padding: '0 0 3px 20px',
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

  const { t } = useTranslation()
  console.log(navigationItems)
  
  const navigationList = navigationItems.map(i => {
    return (
      <ListItem key={ i.label } sx={ style.navItem }>
        <Typography
          component={ Link } 
          sx={ { textDecoration: 'none', opacity: '1' } } to={ i.route } variant="subtitle2"
        >
          { t(`header.guestNavBar.${ i.label }`) }
        </Typography>
      </ListItem>)
  })

  return (
    <Box sx={ style.header }>
      <Button
        component={ Link } size='small' sx={ { m: { xs: '10px', sm: '18px', md: '22px 24px' } } }
        to={ routes.home.route }
      >
        <Logo />
      </Button>
      
      <List sx={ style.navList }>
        { navigationList }
      </List>

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
