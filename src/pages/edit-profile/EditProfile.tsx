import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams
} from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import useConfirm from '~/hooks/use-confirm'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Button from '~scss-components/button/Button'
import SidebarMenu from '~/components/sidebar-menu/SidebarMenu'
import {
  UpdateUserParams,
  UserProfileTabsEnum,
  UserRole,
  DataByRole
} from '~/types'
import { tabsData } from '~/pages/edit-profile/EditProfile.constants'
import {
  fetchUserById,
  updateUser,
  EditProfileState
} from '~/redux/features/editProfileSlice'
import { LoadingStatusEnum } from '~/redux/redux.constants'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'

import { styles } from '~/pages/edit-profile/EditProfile.styles'
import { getChangedFields } from '~/utils/get-changed-fields'
import { replaceEmptyStringsWithNull } from '~/utils/replace-empty-strings-with-null'

const EditProfile = () => {
  const [initialEditProfileState, setInitialEditProfileState] = useState<
    typeof profileState | null
  >(null)

  const [searchParams, setSearchParams] = useSearchParams({
    tab: UserProfileTabsEnum.Profile
  })

  const activeTab = searchParams.get('tab') as UserProfileTabsEnum

  const { t } = useTranslation()

  const dispatch = useAppDispatch()

  const { loading, tabValidityStatus, ...profileState } = useAppSelector(
    (state) => state.editProfile
  )

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const { checkConfirmation } = useConfirm()

  const errorTooltipHolders = {
    [UserProfileTabsEnum.Profile]: !tabValidityStatus.profileTab,
    [UserProfileTabsEnum.ProfessionalInfo]:
      !tabValidityStatus.professionalInfoTab
  }

  const isTabInvalid =
    errorTooltipHolders.profile || errorTooltipHolders.professionalInfo

  const isPasswordSecurityTab =
    activeTab === UserProfileTabsEnum.PasswordAndSecurity

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchUserById({ userId, role: userRole as UserRole, isEdit: true })
      )
    }
    void fetchData()

    return () => {
      void fetchData()
    }
  }, [dispatch, userId, userRole])

  useEffect(() => {
    if (
      loading === LoadingStatusEnum.Fulfilled &&
      initialEditProfileState === null
    ) {
      setInitialEditProfileState(structuredClone(profileState))
    }
  }, [loading, profileState, initialEditProfileState])

  const changedFields = useMemo<Partial<EditProfileState>>(() => {
    if (!profileState || !initialEditProfileState) {
      return {}
    }

    return getChangedFields(initialEditProfileState, profileState)
  }, [profileState, initialEditProfileState])
  const isChanged = useMemo<boolean>(
    () => Object.keys(changedFields).length > 0,
    [changedFields]
  )

  const handleClick = async (tab: UserProfileTabsEnum) => {
    if (activeTab === tab) return

    const confirmed = await checkConfirmation({
      message: 'questions.goBackToProfile',
      title: 'titles.discardChanges',
      confirmButton: t('common.discard'),
      cancelButton: t('common.cancel')
    })
    if (confirmed) {
      setSearchParams({ tab })
    }
  }

  const { hash } = useLocation()
  const navigate = useNavigate()

  const handleUpdateUser = async (): Promise<void> => {
    const { country, city } = profileState
    const {
      videoLink,
      notificationSettings,
      professionalBlock,
      aboutStudent,
      categories,
      photo,
      ...rest
    } = changedFields

    const dataToUpdate: UpdateUserParams = rest

    if (city && country) dataToUpdate.address = { city, country }

    if (videoLink) {
      const updatedVideolink = videoLink[userRole as keyof DataByRole<string>]

      dataToUpdate.videoLink = updatedVideolink
    }

    if (notificationSettings)
      dataToUpdate.notificationSettings = profileState.notificationSettings

    if (professionalBlock)
      dataToUpdate.professionalBlock = profileState.professionalBlock

    if (aboutStudent) {
      dataToUpdate.aboutStudent = aboutStudent
    }

    if (categories) {
      dataToUpdate.mainSubjects = categories
    }

    if (typeof photo === 'object' || photo === '') {
      dataToUpdate.photo = photo
    }

    const dataWithoutEmptyStrings = replaceEmptyStringsWithNull(dataToUpdate)

    await dispatch(
      updateUser({
        userId,
        params: dataWithoutEmptyStrings
      })
    )

    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'editProfilePage.profile.successMessage'
      })
    )
    setInitialEditProfileState(structuredClone(profileState))

    if (hash) {
      navigate(`${authRoutes.myProfile.path}#complete`)
    }
  }

  const cooperationContent = activeTab && tabsData[activeTab]?.content

  if (loading === LoadingStatusEnum.Pending) {
    return <Loader pageLoad size={70} />
  }

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
        <Button
          component={Link}
          disabled={!isChanged || isTabInvalid || isPasswordSecurityTab}
          onClick={() => void handleUpdateUser()}
          size='md'
          sx={styles.updateBtn}
          variant='tonal'
        >
          {t('editProfilePage.updateBtn')}
        </Button>
      </Box>
      <Divider sx={styles.line} />
      <Box sx={styles.mainContainer}>
        <SidebarMenu
          activeTab={activeTab}
          errorTooltipHolders={errorTooltipHolders}
          handleClick={(tab) => void handleClick(tab)}
          tabsData={tabsData}
        />
        <Box sx={styles.mainContent}>{cooperationContent}</Box>
      </Box>
    </PageWrapper>
  )
}

export default EditProfile
