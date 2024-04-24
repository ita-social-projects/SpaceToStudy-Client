import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box } from '@mui/material'

import { useProfileContext } from '~/context/profile-context'
import useUpdateUser from '~/hooks/use-update-user'
import { ButtonVariantEnum, ProfileTabProps, SizeEnum } from '~/types'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import ProfileGeneralTab from '~/containers/edit-profile/profile-tab/profile-tabs/profile-general-tab/ProfileGeneralTab'
import { styles } from '~/containers/edit-profile/profile-tab/profile-tab-inner-container/ProfileTabInnerContainer.styles'

const ProfileTabInnerContainer: FC<ProfileTabProps> = ({ user }) => {
  const { t } = useTranslation()
  const { profileData } = useProfileContext()
  const { handleSubmit, loading } = useUpdateUser(user._id)

  const hasError =
    profileData.generalData.errors &&
    Object.values(profileData.generalData.errors).some((error) => error)

  const handleUpdateProfile = () => {
    handleSubmit(profileData.generalData.data)
    window.location.reload()
  }

  return (
    <Box sx={styles.profileInnerContainer}>
      <Box sx={styles.root}>
        <TitleWithDescription
          description={t('editProfilePage.profile.description')}
          style={styles.headerTitleWithDesc}
          title={t('editProfilePage.profile.title')}
        />
        <ProfileGeneralTab user={user} />
      </Box>

      <AppButton
        disabled={hasError}
        loading={loading}
        onClick={handleUpdateProfile}
        size={SizeEnum.ExtraLarge}
        sx={styles.updateProfileBtn}
        variant={ButtonVariantEnum.Contained}
      >
        {t('editProfilePage.profile.updateProfileBtn')}
      </AppButton>
    </Box>
  )
}

export default ProfileTabInnerContainer
