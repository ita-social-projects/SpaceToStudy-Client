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
  type UpdateUserParams,
  UserProfileTabsEnum,
  type UserRole,
  type DataByRole,
  type UserRoleEnum,
  type SubjectCategory,
  type StudentOrTutor,
  type AboutStudentData,
  type ProfessionalBlock,
  type NotificationSettings
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
import { hasPhotoChanges } from '~/utils/has-photo-changes'

export const mapMainSubjects = (
  categories: Partial<Record<UserRoleEnum, SubjectCategory[]>>,
  userRole: UserRoleEnum
) => {
  return {
    [userRole]: categories[userRole]!.map((item) => ({
      category: { _id: item.category._id },
      subjects: item.subjects.map((subject) => ({
        _id: subject._id
      }))
    }))
  } as StudentOrTutor<SubjectCategory[]>
}

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
  console.log(profileState)

  const { userId, userRole } = useAppSelector((state) => state.appMain) as {
    userId: string
    userRole: UserRoleEnum.Student | UserRoleEnum.Tutor
  }

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

  const hasChanges = (
    initialData:
      | Partial<EditProfileState>
      | DataByRole<string>
      | ProfessionalBlock
      | AboutStudentData
      | NotificationSettings,
    currentData:
      | Partial<EditProfileState>
      | DataByRole<string>
      | ProfessionalBlock
      | AboutStudentData
      | NotificationSettings
  ): boolean => {
    return JSON.stringify(initialData) !== JSON.stringify(currentData)
  }

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
    if (!initialEditProfileState || !profileState) {
      return {}
    }

    const {
      videoLink: initialVideoLink,
      notificationSettings: initialNotificationSettings,
      professionalBlock: initialProfessionalBlock,
      aboutStudent: initialAboutStudent
    } = initialEditProfileState

    const {
      videoLink: currentVideoLink,
      notificationSettings: currentNotificationSettings,
      professionalBlock: currentProfessionalBlock,
      aboutStudent: currentAboutStudent
    } = profileState

    const { photo: initialPhoto, ...initialData } = initialEditProfileState
    const { photo: currentPhoto, ...currentData } = profileState

    const hasPhotoChanged = hasPhotoChanges(initialPhoto, currentPhoto)

    const hasChanged = hasChanges(initialData, currentData) || hasPhotoChanged

    if (hasChanged) {
      const changes: Partial<EditProfileState> = {
        ...currentData
      }

      if (!hasChanges(initialVideoLink, currentVideoLink)) {
        delete changes.videoLink
      }

      if (
        !hasChanges(initialNotificationSettings, currentNotificationSettings)
      ) {
        delete changes.notificationSettings
      }

      if (!hasChanges(initialProfessionalBlock, currentProfessionalBlock)) {
        delete changes.professionalBlock
      }

      if (!hasChanges(initialAboutStudent, currentAboutStudent)) {
        delete changes.aboutStudent
      }

      if (hasPhotoChanged) {
        changes.photo = currentPhoto
      }

      return changes
    } else {
      return {}
    }
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

  const handleUpdateUser = async () => {
    const { country, city } = profileState
    const { videoLink, aboutStudent, categories, photo } = changedFields

    const dataToUpdate: UpdateUserParams = {}

    if (
      (city !== initialEditProfileState?.city ||
        country !== initialEditProfileState?.country) &&
      ('city' in changedFields || 'country' in changedFields)
    ) {
      if (city && country) {
        dataToUpdate.address = { city, country }
      }
    }

    if (videoLink && userRole in videoLink) {
      dataToUpdate.videoLink = videoLink[userRole]
    }

    if ('notificationSettings' in changedFields) {
      dataToUpdate.notificationSettings = profileState.notificationSettings
    }

    if ('professionalBlock' in changedFields) {
      dataToUpdate.professionalBlock = profileState.professionalBlock
    }

    if ('aboutStudent' in changedFields) {
      dataToUpdate.aboutStudent = aboutStudent
    }

    if (categories?.[userRole] && 'categories' in changedFields) {
      dataToUpdate.mainSubjects = mapMainSubjects(categories, userRole)
    }

    if (
      'photo' in changedFields &&
      (typeof photo === 'object' || photo === '')
    ) {
      dataToUpdate.photo = photo
    }

    if (Object.keys(dataToUpdate).length === 0) {
      return
    }

    await dispatch(
      updateUser({
        userId,
        params: dataToUpdate
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
