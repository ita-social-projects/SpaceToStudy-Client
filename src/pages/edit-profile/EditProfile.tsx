import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import { useCallback } from 'react'

import { useAppSelector } from '~/hooks/use-redux'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import ProfileGeneralTab from '~/containers/edit-profile/profile-general-tab/ProfileGeneralTab'
import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppButton from '~/components/app-button/AppButton'
import SidebarMenu from '~/components/sidebar-menu/SidebarMenu'
import {
  ButtonVariantEnum,
  SizeEnum,
  TutorProfileTabsEnum,
  UserResponse,
  UserRole
} from '~/types'
import { tabsData } from '~/pages/edit-profile/EditProfile.constants'

import { styles } from '~/pages/edit-profile/EditProfile.styles'

const EditProfile = () => {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(TutorProfileTabsEnum.Profile)

  const cooperationContent = activeTab && tabsData[activeTab]?.content

  const handleClick = (tab: TutorProfileTabsEnum) => {
    setActiveTab(tab)
  }

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const { loading, response } = useAxios<UserResponse>({
    service: getUserData,
    fetchOnMount: true
  })

  if (loading) {
    return <Loader pageLoad size={70} />
  }

  return (
    <PageWrapper>
      <Box sx={styles.headerContainer}>
        <Box>
          <Typography sx={styles.title}>
            {t('editTutor.main.accountSettings')}
          </Typography>
          <Typography sx={styles.description}>
            {t('editTutor.main.littleDescription')}
          </Typography>
        </Box>
        <AppButton
          size={SizeEnum.Small}
          sx={styles.backBtn}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('editTutor.main.backBtn')}
        </AppButton>
      </Box>
      <Divider sx={styles.line} />
      <Box sx={styles.mainContainer}>
        <SidebarMenu
          handleClick={handleClick}
          styles={styles.sidebarMenu}
          tabsData={tabsData}
        />
        <Box sx={styles.mainContent}>{cooperationContent}</Box>
      </Box>
      <ProfileGeneralTab user={response} />
    </PageWrapper>
  )
}

export default EditProfile
