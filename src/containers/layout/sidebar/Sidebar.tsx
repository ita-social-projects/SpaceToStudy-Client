import { FC, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

import HashLink from '~/components/hash-link/HashLink'
import useBreakpoints from '~/hooks/use-breakpoints'
import { RouteItem } from '~/types/common/interfaces/common.interfaces'

import { styles } from '~/containers/layout/sidebar/Sidebar.styles'

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

  const navigationContent = useMemo(
    () => (
      <>
        {renderListItems(navigationItems)}
        {isMobile && accountItems.length > 0 && (
          <>
            <Divider />
            {renderListItems(accountItems)}
          </>
        )}
      </>
    ),
    [navigationItems, accountItems]
  )

  return navigationContent
}

export default Sidebar
