import Box from '@mui/material/Box'
import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import useForm from '~/hooks/use-form'
import { useDebounce } from '~/hooks/use-debounce'
import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import { validations } from '~/components/user-steps-wrapper/constants'
import ProfileTabForm from '~/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm'
import {
  updateProfileData,
  updateValidityStatus
} from '~/redux/features/editProfileSlice'
import { EditProfileForm, MainUserRole } from '~/types'
import { styles } from '~/containers/edit-profile/profile-tab/ProfileTab.styles'
import { scrollToAndHighlight } from '~/utils/scroll-and-highlight'

const ProfileTab: FC = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector((state) => state.appMain)
  const {
    city,
    country,
    firstName,
    lastName,
    nativeLanguage,
    photo,
    professionalSummary,
    videoLink
  } = useAppSelector((state) => state.editProfile)

  const initialValues: EditProfileForm = {
    city,
    country,
    firstName,
    lastName,
    nativeLanguage,
    photo: photo || null,
    professionalSummary: professionalSummary || '',
    videoLink:
      typeof videoLink === 'string'
        ? videoLink
        : videoLink?.[userRole as MainUserRole] ?? ''
  }

  const {
    isValid,
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    trigger,
    data,
    errors
  } = useForm<EditProfileForm>({
    initialValues,
    validations
  })

  const debouncedUpdateProfileData = useDebounce(() => {
    void dispatch(updateProfileData(data))
  }, 300)

  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (hash) {
      // console.log(hash)
      scrollToAndHighlight(`${pathname}${hash}`)
    }
  }, [pathname, hash])

  useEffect(() => {
    debouncedUpdateProfileData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    trigger()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    void dispatch(updateValidityStatus({ tab: 'profileTab', value: isValid }))
  }, [isValid, dispatch])

  return (
    <Box sx={styles.profileInnerContainer}>
      <Box sx={styles.root}>
        <TitleWithDescription
          description={t('editProfilePage.profile.description')}
          style={styles.headerTitleWithDesc}
          title={t('editProfilePage.profile.title')}
        />
        <ProfileTabForm
          data={data}
          errors={errors}
          handleBlur={handleBlur}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
        />
      </Box>
    </Box>
  )
}

export default ProfileTab
