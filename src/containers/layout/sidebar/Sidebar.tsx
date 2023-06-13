import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

import HashLink from '~/components/hash-link/HashLink'
import useBreakpoints from '~/hooks/use-breakpoints'

import { styles } from '~/containers/layout/sidebar/Sidebar.styles'

interface RouteItem {
  route: string
  path: string
}

interface SidebarProps {
  onClose: () => void
  navigationItems: RouteItem[]
  accountItems: RouteItem[]
}

const Sidebar: FC<SidebarProps> = ({
  onClose,
  navigationItems,
  accountItems
}) => {
  const { isMobile } = useBreakpoints()
  const { t } = useTranslation()

  const renderListItems = (items: RouteItem[]) => (
    <List sx={styles.list}>
      {items.map(({ route, path }) => (
        <ListItem key={route} sx={styles.listItem}>
          <Typography
            component={HashLink}
            onClick={onClose}
            sx={styles.listTitle}
            to={path}
          >
            {t(`header.${route}`)}
          </Typography>
        </ListItem>
      ))}
    </List>
  )

  return (
    <Box>
      {renderListItems(navigationItems)}
      {isMobile && accountItems.length > 0 && (
        <>
          <Divider />
          {renderListItems(accountItems)}
        </>
      )}
    </Box>
  )
}

export default Sidebar
