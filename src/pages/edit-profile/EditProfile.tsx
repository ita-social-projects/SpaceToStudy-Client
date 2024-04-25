import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import useConfirm from '~/hooks/use-confirm'

import { authRoutes } from '~/router/constants/authRoutes'
import { useAppSelector } from '~/hooks/use-redux'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
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

  const navigate = useNavigate()

  const handleClick = (tab: TutorProfileTabsEnum) => {
    setActiveTab(tab)
  }

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )
  const { checkConfirmation } = useConfirm()

  const { loading, response } = useAxios<UserResponse>({
    service: getUserData,
    fetchOnMount: true
  })

  if (loading) {
    return <Loader pageLoad size={70} />
  }

  const handleBack = async () => {
    const confirmed = checkConfirmation({
      message: 'questions.goBackToProfile',
      title: 'titles.saveChanges',
      confirmButton: t('common.saveChanges'),
      cancelButton: t('common.discard')
    })
    if (await confirmed) {
      navigate(authRoutes.accountMenu.myProfile.path)
    }
  }

  const cooperationContent =
    activeTab && tabsData[activeTab]?.content?.(response)

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
          onClick={() => void handleBack()}
          size={SizeEnum.Large}
          sx={styles.backBtn}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('editTutor.main.backBtn')}
        </AppButton>
      </Box>
      <Divider sx={styles.line} />
      <Box sx={styles.mainContainer}>
        <SidebarMenu handleClick={handleClick} tabsData={tabsData} />
        <Box sx={styles.mainContent}>{cooperationContent}</Box>
      </Box>
    </PageWrapper>
  )
}

export default EditProfile
