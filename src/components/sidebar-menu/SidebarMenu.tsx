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
  tooltipTabHolder: UserProfileTabsEnum
  hasErrors: boolean
}

const SidebarMenu: FC<SidebarMenu> = ({
  handleClick,
  tabsData,
  activeTab,
  tooltipTabHolder,
  hasErrors
}) => {
  const { t } = useTranslation()

  const list = Object.keys(tabsData).map((key) => {
    const tabKey = key as UserProfileTabsEnum
    const item = tabsData[tabKey]

    const isTabActive = tabKey === activeTab

    const tooltipContent = (
      <Box sx={styles.tooltipContent}>
        <ErrorOutlineIcon sx={styles.errorIcon} />
        {t('editProfilePage.profile.generalTab.errorTooltip')}
      </Box>
    )
    const tooltipOpen = hasErrors && !isTabActive && tabKey === tooltipTabHolder

    return (
      <ListItem key={tabKey} onClick={() => handleClick(tabKey)}>
        <ListItemButton sx={styles.tabButton(isTabActive)}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText>
            <Tooltip
              PopperProps={styles.popperProps}
              arrow
              open={tooltipOpen}
              placement='right'
              slotProps={styles.slotProps}
              title={tooltipContent}
            >
              <span>{t(item.title)}</span>
            </Tooltip>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    )
  })

  return <List sx={styles.tabList}>{list}</List>
}

export default SidebarMenu
