import { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'

import useUpdateUser from '~/hooks/use-update-user'
import useConfirm from '~/hooks/use-confirm'
import useForm from '~/hooks/use-form'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import AppButton from '~/components/app-button/AppButton'
import ProfileTabForm from '~/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm'
import {
  getProfileInitialValues,
  getUserUpdatedData
} from '~/utils/get-profile-values'
import { validations } from '~/components/user-steps-wrapper/constants'
import { styles } from '~/containers/edit-profile/profile-tab/ProfileTab.styles'
import {
  ButtonVariantEnum,
  EditProfileForm,
  SizeEnum,
  EditProfileTabUserProps
} from '~/types'

const ProfileTab: FC<EditProfileTabUserProps> = ({ user }) => {
  const { t } = useTranslation()
  const { setNeedConfirmation } = useConfirm()
  const { handleSubmit, loading } = useUpdateUser(user._id)

  const initialValues = getProfileInitialValues(user)

  const {
    isDirty,
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    data,
    errors
  } = useForm<EditProfileForm>({
    initialValues,
    validations
  })

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [setNeedConfirmation, isDirty])

  const handleUpdateData = () => {
    const updatedData = getUserUpdatedData(data)
    handleSubmit(updatedData)
    setNeedConfirmation(false)
  }

  const hasError = Object.values(errors).some((error) => error)

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

      <AppButton
        disabled={hasError}
        loading={loading}
        onClick={handleUpdateData}
        size={SizeEnum.ExtraLarge}
        sx={styles.updateProfileBtn}
        variant={ButtonVariantEnum.Contained}
      >
        {t('editProfilePage.profile.updateProfileBtn')}
      </AppButton>
    </Box>
  )
}

export default ProfileTab
