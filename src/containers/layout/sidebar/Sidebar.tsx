import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import HashLink from '~/components/hash-link/HashLink'
import AppDrawer from '~/components/app-drawer/AppDrawer'

import { styles } from '~/containers/layout/sidebar/Sidebar.styles'

interface SidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (value: boolean) => void
  navigationItems: { route: string; path: string }[]
}

const Sidebar: FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  navigationItems
}) => {
  const { t } = useTranslation()

  const handleCloseSidebar = () => setIsSidebarOpen(false)

  const navigationList = navigationItems.map(({ route, path }) => {
    return (
      <ListItem key={route}>
        <Typography
          component={HashLink}
          onClick={handleCloseSidebar}
          sx={styles.listItem}
          to={path}
        >
          {t(`header.${route}`)}
        </Typography>
      </ListItem>
    )
  })

  return (
    <AppDrawer onClose={handleCloseSidebar} open={isSidebarOpen}>
      <List sx={styles.list}>{navigationList}</List>
    </AppDrawer>
  )
}

export default Sidebar
