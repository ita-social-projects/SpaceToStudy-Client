import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { matchPath, useLocation } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'

import AppDrawer from '~/components/app-drawer/AppDrawer'
import HashLink from '~/components/hash-link/HashLink'
import Sidebar from '~/containers/layout/sidebar/Sidebar'
import Logo from '~/containers/logo/Logo'
import NavigationIcons from '~/containers/navigation-icons/NavigationIcons'
import { useDrawer } from '~/hooks/use-drawer'
import { authRoutes } from '~/router/constants/authRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'

import { useSelector } from 'react-redux'
import { student, tutor } from '~/constants'
import { styles } from '~/containers/layout/navbar/NavBar.styles'

const Navbar = () => {
  const { userRole } = useSelector((state) => state.appMain)
  const { openDrawer, closeDrawer, isOpen } = useDrawer()
  const { pathname } = useLocation()
  const { t } = useTranslation()

  const homePath = userRole
    ? guestRoutes[userRole].path
    : guestRoutes.welcome.path

  const navigationItems = useMemo(() => {
    if (userRole === student) {
      return Object.values(studentRoutes.navBar)
    } else if (userRole === tutor) {
      return Object.values(tutorRoutes.navBar)
    }
    return Object.values(guestRoutes.navBar)
  }, [userRole])

  const accountItems = useMemo(() => {
    if (!userRole) return []
    return Object.values(authRoutes.accountMenu)
  }, [userRole])

  const handleOpenSidebar = () => {
    openDrawer()
  }

  const navigationList = navigationItems.map((item, idx, array) => {
    const isLast = array.length - 1 === idx
    const isActive = Boolean(matchPath(item.path, pathname))

    return (
      <Fragment key={item.route}>
        <ListItem>
          <Typography
            component={HashLink}
            sx={styles.navItemText(isActive)}
            to={item.path}
          >
            {t(`header.${item.route}`)}
          </Typography>
        </ListItem>
        {!isLast && <Typography sx={styles.divider}>{'/'}</Typography>}
      </Fragment>
    )
  })

  return (
    <Box sx={styles.header}>
      <Button
        component={HashLink}
        size={'small'}
        sx={styles.logoButton}
        to={homePath}
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
