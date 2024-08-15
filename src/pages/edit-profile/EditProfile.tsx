import { useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import useConfirm from '~/hooks/use-confirm'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppButton from '~/components/app-button/AppButton'
import SidebarMenu from '~/components/sidebar-menu/SidebarMenu'
import {
  ButtonVariantEnum,
  SizeEnum,
  UpdateUserParams,
  UserProfileTabsEnum,
  UserRole
} from '~/types'
import { tabsData } from '~/pages/edit-profile/EditProfile.constants'

import { styles } from '~/pages/edit-profile/EditProfile.styles'
import {
  fetchUserById,
  updateUser,
  EditProfileState
} from '~/redux/features/editProfileSlice'
import { LoadingStatusEnum } from '~/redux/redux.constants'
import { openAlert } from '~/redux/features/snackbarSlice'
import { snackbarVariants } from '~/constants'

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

  const hasChanges = (
    initialData: Partial<EditProfileState>,
    currentData: Partial<EditProfileState>
  ): boolean => {
    return JSON.stringify(initialData) !== JSON.stringify(currentData)
  }

  const isTabInvalid =
    errorTooltipHolders.profile || errorTooltipHolders.professionalInfo

  const hasChanges = (
    initialData: Partial<EditProfileState>,
    currentData: Partial<EditProfileState>
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
    if (!initialEditProfileState || !profileState) return {}

    const {
      // TODO: because of different videolink types in editProfileSlice.ts and ProfileTab.tsx,
      // we have a hot solution below to compare states without videolink.
      // We need to fix videolink types and also save it on Update click
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      videoLink: initialVideoLink,
      photo: initialPhoto,
      ...initialData
    } = initialEditProfileState
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      videoLink: currentVideoLink,
      photo: currentPhoto,
      ...currentData
    } = profileState

    const hasChanged = hasChanges(initialData, currentData)

    if (hasChanged) {
      const changes: Partial<EditProfileState> = { ...currentData }
      if (initialPhoto === currentPhoto) {
        delete changes.photo
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

  const handleUpdateUser = async (): Promise<void> => {
    const { country, city } = profileState
    const {
      // TODO: we remove 'photo' from the changed fields because:
      // 1 - we should deal with its types. It expects to be string in fact, when the photo is uploaded, we received an object.
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      photo,
      videoLink,
      notificationSettings,
      professionalBlock,
      // TODO: we remove 'categories' from the changed fields because:
      // 1 - we should create thunk for categories update in editProfileSlice;
      // 2 - we should create an endpoint for categories update on back end in services/user.js
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      categories,
      ...rest
    } = changedFields

    const dataToUpdate: UpdateUserParams = rest

    if (city && country) dataToUpdate.address = { city, country }

    if (videoLink) {
      dataToUpdate.videoLink =
        typeof videoLink === 'string'
          ? videoLink
          : videoLink[userRole as keyof typeof videoLink]
    }

    if (notificationSettings)
      dataToUpdate.notificationSettings = profileState.notificationSettings

    if (professionalBlock)
      dataToUpdate.professionalBlock = profileState.professionalBlock

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
        <AppButton
          component={Link}
          disabled={!isChanged || isTabInvalid}
          onClick={() => void handleUpdateUser()}
          size={SizeEnum.Large}
          sx={styles.updateBtn}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('editProfilePage.updateBtn')}
        </AppButton>
      </Box>
      <Divider sx={styles.line} />
      <Box sx={styles.mainContainer}>
        <SidebarMenu
          activeTab={activeTab}
          errorTooltipHolders={errorTooltipHolders}
          handleClick={(tab) => void handleClick(tab)}
          tabsData={tabsData}
        />
        <Box sx={styles.mainContent}>
          {cooperationContent} {/* Відображаємо контент завжди */}
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EditProfile
