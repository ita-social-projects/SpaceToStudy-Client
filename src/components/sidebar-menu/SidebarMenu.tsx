import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import List from '@mui/material/List'
import ListItemIcon from '@mui/material/ListItemIcon'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { Box, Tooltip } from '@mui/material'

import { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { UserProfileProps } from '~/pages/edit-profile/EditProfile.constants'
import { UserProfileTabsEnum } from '~/types'

import { styles } from '~/components/sidebar-menu/SidebarMenu.styles'

interface SidebarMenu {
  tabsData: UserProfileProps
  handleClick: (tab: UserProfileTabsEnum) => void
  activeTab: UserProfileTabsEnum
  errorTooltipHolders: Partial<Record<UserProfileTabsEnum, boolean>>
}

const SidebarMenu: FC<SidebarMenu> = ({
  handleClick,
  tabsData,
  activeTab,
  errorTooltipHolders
}) => {
  const { t } = useTranslation()

  const list = Object.keys(tabsData).map((key) => {
    const tabKey = key as UserProfileTabsEnum
    const item = tabsData[tabKey]

    const isTabActive = tabKey === activeTab

    const enableTooltipError = !isTabActive && errorTooltipHolders?.[tabKey]

    const toolTip = enableTooltipError && (
      <Tooltip
        arrow
        placement='right'
        title={t('editProfilePage.profile.generalTab.errorTooltip')}
      >
        <ErrorOutlineIcon sx={styles.errorIcon} />
      </Tooltip>
    )

    return (
      <ListItem key={tabKey} onClick={() => handleClick(tabKey)}>
        <ListItemButton sx={styles.tabButton(isTabActive)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>
            <Box sx={styles.listItemContent}>
              {t(item.title)}
              {toolTip}
            </Box>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    )
  })

  return <List sx={styles.tabList}>{list}</List>
}

export default SidebarMenu
