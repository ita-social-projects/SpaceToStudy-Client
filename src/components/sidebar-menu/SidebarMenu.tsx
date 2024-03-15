import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  SxProps,
  Theme
} from '@mui/material'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { TutorProfileProps } from '~/pages/edit-profile/EditProfile.constants'
import { TutorProfileTabsEnum } from '~/types'

interface SidebarMenu {
  tabsData: TutorProfileProps
  handleClick: (tab: TutorProfileTabsEnum) => void
  styles?: SxProps<Theme>
}

const SidebarMenu: FC<SidebarMenu> = ({ handleClick, tabsData, styles }) => {
  const { t } = useTranslation()

  const list = Object.keys(tabsData).map((key) => {
    const tabKey = key as TutorProfileTabsEnum
    const item = tabsData[tabKey]
    return (
      <ListItem key={tabKey} onClick={() => handleClick(tabKey)}>
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={t(item.title)} />
        </ListItemButton>
      </ListItem>
    )
  })

  return <List sx={styles}>{list}</List>
}

export default SidebarMenu
