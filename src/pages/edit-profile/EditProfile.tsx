import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppButton from '~/components/app-button/AppButton'
import SidebarMenu from '~/components/sidebar-menu/SidebarMenu'
import { ButtonVariantEnum, SizeEnum } from '~/types'
import { tabsData } from '~/pages/edit-profile/EditProfile.constants'
import { TutorProfileTabsEnum } from '~/types'

import { styles } from '~/pages/edit-profile/EditProfile.styles'

const EditProfile = () => {
  const { t } = useTranslation()

  const [activeTab, setActiveTab] = useState(TutorProfileTabsEnum.Profile)

  const cooperationContent = activeTab && tabsData[activeTab]?.content

  const handleClick = (tab: TutorProfileTabsEnum) => {
    setActiveTab(tab)
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
        <Box>{cooperationContent}</Box>
      </Box>
    </PageWrapper>
  )
}

export default EditProfile
