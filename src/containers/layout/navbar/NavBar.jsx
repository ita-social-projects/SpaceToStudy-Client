import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
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
import AppDrawer from '~/components/app-drawer/AppDrawer'
import { useDrawer } from '~/hooks/use-drawer'
import { student, tutor } from '~/constants'

import { styles } from '~/containers/layout/navbar/NavBar.styles'

const Navbar = () => {
  const [navigationItems, setNavigationItems] = useState(
    Object.values(guestRoutes.navBar)
  )
  const [accountItems, setAccountItems] = useState(Object.values(guestRoutes))

  const { userRole } = useSelector((state) => state.appMain)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { t } = useTranslation()

  useEffect(() => {
    if (userRole === student) {
      setNavigationItems(Object.values(studentRoutes.navBar))
      setAccountItems(Object.values(studentRoutes.accountMenu))
    } else if (userRole === tutor) {
      setNavigationItems(Object.values(tutorRoutes.navBar))
      setAccountItems(Object.values(tutorRoutes.accountMenu))
    } else {
      setNavigationItems(Object.values(guestRoutes.navBar))
      setAccountItems(Object.values(guestRoutes))
    }
  }, [userRole])

  const handleOpenSidebar = () => {
    openDrawer()
  }

  const navigationList = navigationItems.map((item) => {
    return (
      <ListItem key={item.route} sx={styles.navItem}>
        <Typography
          component={HashLink}
          sx={styles.navItemText}
          to={item.path}
          variant='subtitle2'
        >
          {t(`header.${item.route}`)}
        </Typography>
      </ListItem>
    )
  })

  return (
    <Box sx={styles.header}>
      <Button
        component={HashLink}
        size='small'
        sx={styles.logoButton}
        to={guestRoutes.welcome.path}
      >
        <Logo />
      </Button>

      <List sx={styles.navList}>{navigationList}</List>

      <NavigationIcons setSidebarOpen={handleOpenSidebar} />
      <AppDrawer onClose={closeDrawer} open={isOpen}>
        <Sidebar
          accountItems={accountItems}
          navigationItems={navigationItems}
          onClose={closeDrawer}
        />
      </AppDrawer>
    </Box>
  )
}

export default Navbar
