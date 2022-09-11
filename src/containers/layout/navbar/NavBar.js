import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import HashLink from '~/components/hash-link/HashLink'
import Logo from '~/containers/logo/Logo'
import Sidebar from '~/containers/layout/sidebar/Sidebar'
import NavigationIcons from '~/containers/navigation-icons/NavigationIcons'
import { student } from '~/constants'

import { style } from '~/containers/layout/navbar/NavBar.styles'

const Navbar = () => {
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [navigationItems, setNavigationItems] = useState(Object.values(guestRoutes.guestNavBar))
  const { userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (userRole === student) setNavigationItems(Object.values(studentRoutes.navBar))
  }, [userRole])

  const navigationList = navigationItems.map((item) => {
    return (
      <ListItem key={ item.label } sx={ style.navItem }>
        <Typography
          component={ HashLink } sx={ style.navItemText } to={ item.path }
          variant='subtitle2'
        >
          { t(`header.${item.label}`) }
        </Typography>
      </ListItem>
    )
  })

  return (
    <Box sx={ style.header }>
      <Button
        component={ Link } size='small' sx={ style.logoButton }
        to={ guestRoutes.home.path }
      >
        <Logo />
      </Button>

      <List sx={ style.navList }>
        { navigationList }
      </List>

      <NavigationIcons setIsSidebarOpen={ setIsSidebarOpen } />

      <Sidebar isSidebarOpen={ isSidebarOpen } navigationItems={ navigationItems } setIsSidebarOpen={ setIsSidebarOpen } />
    </Box>
  )
}

export default Navbar
