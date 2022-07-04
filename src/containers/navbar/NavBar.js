import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { routes, studentRoutes } from '~/constants/routes'
import { useTranslation } from 'react-i18next'
import { Typography, Box, Button, List, ListItem  } from '@mui/material'

import Logo from '~/containers/logo/Logo'
import Sidebar from '~/containers/sidebar/Sidebar'

import HeaderIcons from '~/containers/header-icons/HeaderIcons'
import { style } from '~/containers/navbar/navbar.style'


const Navbar = () => {
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [ navigationItems , setNavigationItems] = useState(Object.values(routes.guestNavBar))
  const { userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (userRole ==='student') setNavigationItems(Object.values(studentRoutes.studentNavBar))
  }, [userRole])
  

  const navigationList = navigationItems.map(item => {
    return (
      <ListItem key={ item.label } sx={ style.navItem }>
        <Typography
          component={ Link }
          sx={ style.navItemText }
          to={ item.route }
          variant="subtitle2"
        >
          { t(`header.${ item.label }`) }
        </Typography>
      </ListItem>)
  })

  return (
    <Box sx={ style.header }>
      <Button
        component={ Link }
        size='small' sx={ style.logoButton }
        to={ routes.home.route }
      >
        <Logo />
      </Button>
      
      <List sx={ style.navList }>
        { navigationList }
      </List>

      <HeaderIcons setIsSidebarOpen={ setIsSidebarOpen } />

      <Sidebar isSidebarOpen={ isSidebarOpen } navigationItems={ navigationItems } setIsSidebarOpen={ setIsSidebarOpen } />
    </Box>
  )
}

export default Navbar
