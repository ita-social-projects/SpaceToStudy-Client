import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import HashLink from '~/components/hash-link/HashLink'

import { styles } from '~/containers/layout/sidebar/Sidebar.styles'
import useBreakpoints from '~/hooks/use-breakpoints'

interface SidebarProps {
  onClose: () => void
  navigationItems: { route: string; path: string }[]
  accountItems: { route: string; path: string }[]
}

const Sidebar: FC<SidebarProps> = ({
  onClose,
  navigationItems,
  accountItems
}) => {
  const { isMobile } = useBreakpoints()
  const { t } = useTranslation()

  const items = isMobile
    ? navigationItems.concat(accountItems)
    : navigationItems

  const sidebarList = items.map(({ route, path }) => {
    return (
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
    )
  })

  return <List sx={styles.list}> {sidebarList} </List>
}

export default Sidebar
