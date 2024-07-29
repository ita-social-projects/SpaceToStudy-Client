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
  UserProfileTabsEnum,
  UserRole
} from '~/types'
import { tabsData } from '~/pages/edit-profile/EditProfile.constants'

import { styles } from '~/pages/edit-profile/EditProfile.styles'
import { fetchUserById } from '~/redux/features/editProfileSlice'
import { LoadingStatusEnum } from '~/redux/redux.constants'
import { updatedDiff } from 'deep-object-diff'

const EditProfile = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { loading, ...profileState } = useAppSelector(
    (state) => state.editProfile
  )

  const [initialEditProfileState, setInitialEditProfileState] = useState<
    typeof profileState | null
  >(null)
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

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(
        fetchUserById({ userId, role: userRole as UserRole, isEdit: true })
      )
    }
    void fetchData()
  }, [dispatch, userId, userRole])

  const { checkConfirmation } = useConfirm()

  useEffect(() => {
    if (
      loading === LoadingStatusEnum.Fulfilled &&
      initialEditProfileState === null
    ) {
      setInitialEditProfileState(structuredClone(profileState))
      console.log('Setting initial state:', profileState)
    }
  }, [loading, profileState, initialEditProfileState])

  const isChanged = useMemo<boolean>(() => {
    if (!initialEditProfileState || !profileState) return false

    // TODO: because of different videolink types in editProfileSlice.ts and ProfileTab.tsx, we have a hot solution below to compare states without videolink. later, we need to fix it
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { videoLink, ...initialData } = initialEditProfileState
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { videoLink: videoLinkCurrent, ...currentData } = profileState

    const changedFields = updatedDiff(initialData, currentData)

    const isChanged = Boolean(Object.values(changedFields).length)

    console.log('changed fields', changedFields)
    console.log('isChanged', isChanged)

    return isChanged
  }, [profileState, initialEditProfileState])

  useEffect(() => {
    console.log('isChanged:', {
      isChanged,
      profileState,
      initialEditProfileState
    })
  }, [isChanged, profileState, initialEditProfileState])

  if (loading === LoadingStatusEnum.Pending) {
    return <Loader pageLoad size={70} />
  }

  const cooperationContent = activeTab && tabsData[activeTab]?.content

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
          disabled={!isChanged}
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
          handleClick={(tab) => void handleClick(tab)}
          tabsData={tabsData}
        />
        <Box sx={styles.mainContent}>{cooperationContent}</Box>
      </Box>
    </PageWrapper>
  )
}

export default EditProfile
