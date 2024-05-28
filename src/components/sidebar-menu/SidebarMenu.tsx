import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'

import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { UserProfileProps } from '~/pages/edit-profile/EditProfile.constants'
import { UserProfileTabsEnum } from '~/types'

import { styles } from '~/components/sidebar-menu/SidebarMenu.styles'

interface SidebarMenu {
  tabsData: UserProfileProps
  handleClick: (tab: UserProfileTabsEnum) => void
  activeTab: UserProfileTabsEnum
}

const SidebarMenu: FC<SidebarMenu> = ({ handleClick, tabsData, activeTab }) => {
  const { t } = useTranslation()

  const list = Object.keys(tabsData).map((key) => {
    const tabKey = key as UserProfileTabsEnum
    const item = tabsData[tabKey]

    const isActiveTab = item.title.endsWith(activeTab)

    return (
      <ListItem key={tabKey} onClick={() => handleClick(tabKey)}>
        <ListItemButton sx={styles.tabButton(isActiveTab)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={t(item.title)} />
        </ListItemButton>
      </ListItem>
    )
  })

  return <List sx={styles.tabList}>{list}</List>
}

export default SidebarMenu
