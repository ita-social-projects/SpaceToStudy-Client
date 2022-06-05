import { useState } from 'react'
import { Link } from 'react-router-dom'
import { routes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'
import { Typography, Box, Button, IconButton, List, ListItem  } from '@mui/material'

import Logo from '~/containers/logo/Logo'
import Sidebar from '~/containers/sidebar/Sidebar'
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
  },
  menuIcon: {
    display: { md: 'none' },
    marginRight: '11px',
  }
}

const Navbar = ({ navigationItems, children }) => {

  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const openSidebar = () => {
    setIsOpen(true)
    console.log(isOpen)
  }
  
  const navigationList = navigationItems.map(item => {
    return (
      <ListItem key={ item.label } sx={ style.navItem }>
        <Typography
          component='a'
          href={ item.route } sx={ { color: 'primary.900', textDecoration: 'none', opacity: '1' } } variant="subtitle2"
        >
          { t(`header.guestNavBar.${ item.label }`) }
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
        <IconButton size='large' sx={ { display: { xs: 'none', sm: 'inherit' } } }>
          <LanguageIcon color='primary' />
        </IconButton>
        { children }
        <IconButton onClick={ openSidebar } size='large' sx={ style.menuIcon }>
          <MenuIcon color='primary' />
        </IconButton>
      </Box>
      <Sidebar isOpen={ isOpen } navigationItems={ navigationItems } setIsOpen={ setIsOpen } />
    </Box>
  )
}

export default Navbar

Navbar.propTypes = {
  navigationItems: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired
}
