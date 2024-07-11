import { useCallback, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import useConfirm from '~/hooks/use-confirm'

import { authRoutes } from '~/router/constants/authRoutes'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import { userService } from '~/services/user-service'
import useAxios from '~/hooks/use-axios'
import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppButton from '~/components/app-button/AppButton'
import SidebarMenu from '~/components/sidebar-menu/SidebarMenu'
import {
  ButtonVariantEnum,
  MainUserRole,
  SizeEnum,
  UserProfileTabsEnum,
  UserResponse,
  UserRole
} from '~/types'
import { tabsData } from '~/pages/edit-profile/EditProfile.constants'

import { styles } from '~/pages/edit-profile/EditProfile.styles'
import { fetchUserById } from '~/redux/features/editProfileSlice'
import { LoadingStatusEnum } from '~/redux/redux.constants'

const EditProfile = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.editProfile)

  const [searchParams, setSearchParams] = useSearchParams({
    tab: UserProfileTabsEnum.Profile
  })

  const activeTab = searchParams.get('tab') as UserProfileTabsEnum

  const handleClick = async (tab: UserProfileTabsEnum) => {
    if (activeTab === tab) return

    const confirmed = checkConfirmation({
      message: 'questions.goBackToProfile',
      title: 'titles.discardChanges',
      confirmButton: t('common.discard'),
      cancelButton: t('common.cancel')
    })
    if (await confirmed) {
      setSearchParams({ tab })
    }
  }

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData = useCallback(
    () => userService.getUserById(userId, userRole as UserRole, true),
    [userId, userRole]
  )

  useEffect(() => {
    void dispatch(
      fetchUserById({ userId, role: userRole as UserRole, isEdit: true })
    )
  }, [dispatch, userId, userRole])

  const { checkConfirmation } = useConfirm()

  //! delete when all tabs are ready
  const { loading: userLoading, response } = useAxios<UserResponse>({
    service: getUserData,
    fetchOnMount: true
  })

  if (loading === LoadingStatusEnum.Pending || userLoading) {
    return <Loader pageLoad size={70} />
  }

  const cooperationContent =
    activeTab &&
    tabsData[activeTab]?.content?.(response, userRole as MainUserRole)

  return (
    <PageWrapper>
      <Box sx={styles.headerContainer}>
        <Box>
          <Typography sx={styles.title}>
            {t('editProfilePage.title')}
          </Typography>
          <Typography sx={styles.description}>
            {t('editProfilePage.description')}
          </Typography>
        </Box>
        <AppButton
          component={Link}
          size={SizeEnum.Large}
          sx={styles.backBtn}
          to={authRoutes.accountMenu.myProfile.path}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('editProfilePage.backBtn')}
        </AppButton>
      </Box>
      <Divider sx={styles.line} />
      <Box sx={styles.mainContainer}>
        <SidebarMenu
          activeTab={activeTab}
          handleClick={(tab) => void handleClick(tab)}
          tabsData={tabsData}
        />
        <Box sx={styles.mainContent}>{cooperationContent}</Box>
      </Box>
    </PageWrapper>
  )
}

export default EditProfile
