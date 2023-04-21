import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

import HashLink from '~/components/hash-link/HashLink'

import { styles } from '~/containers/layout/sidebar/Sidebar.styles'

interface SidebarProps {
  onClose: () => void
  navigationItems: { route: string; path: string }[]
}

const Sidebar: FC<SidebarProps> = ({ onClose, navigationItems }) => {
  const { t } = useTranslation()

  const navigationList = navigationItems.map(({ route, path }) => {
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

  return <List sx={styles.list}>{navigationList}</List>
}

export default Sidebar
