import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'
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
import { admin, student, tutor } from '~/constants'

import { styles } from '~/containers/layout/navbar/NavBar.styles'

const Navbar = () => {
  const { t } = useTranslation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [navigationItems, setNavigationItems] = useState(Object.values(guestRoutes.navBar))
  const { userRole } = useSelector((state) => state.appMain)

  useEffect(() => {
    if (userRole === student) setNavigationItems(Object.values(studentRoutes.navBar))
    else if (userRole === tutor) setNavigationItems(Object.values(tutorRoutes.navBar))
    else if (userRole === admin) setNavigationItems([])
    else setNavigationItems(Object.values(guestRoutes.navBar))
  }, [userRole])

  const navigationList = navigationItems.map((item) => {
    return (
      <ListItem key={ item.label } sx={ styles.navItem }>
        <Typography
          component={ HashLink } sx={ styles.navItemText } to={ item.route }
          variant='subtitle2'
        >
          { t(`header.${item.label}`) }
        </Typography>
      </ListItem>
    )
  })

  return (
    <Box sx={ styles.header }>
      <Button
        component={ Link } size='small' sx={ styles.logoButton }
        to={ guestRoutes.home.route }
      >
        <Logo />
      </Button>

      <List sx={ styles.navList }>
        { navigationList }
      </List>

      <NavigationIcons setIsSidebarOpen={ setIsSidebarOpen } />

      <Sidebar isSidebarOpen={ isSidebarOpen } navigationItems={ navigationItems } setIsSidebarOpen={ setIsSidebarOpen } />
    </Box>
  )
}

export default Navbar
