import { FC, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import InputAdornment from '@mui/material/InputAdornment'

import useForm from '~/hooks/use-form'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import LocationSelectionInputs from '~/components/location-selection-inputs/LocationSelectionInputs'

import { languages } from '~/containers/tutor-home-page/language-step/constants'
import { validations } from '~/components/user-steps-wrapper/constants'
import { getInitialValues } from '~/containers/edit-profile/profile-general-tab/ProfileGeneralTab.constants'
import { styles } from '~/containers/edit-profile/profile-general-tab/ProfileGeneralTab.styles'
import {
  ButtonVariantEnum,
  EditProfileForm,
  PositionEnum,
  SizeEnum,
  UserResponse
} from '~/types'

interface ProfileGeneralTabProps {
  user: UserResponse
}

const ProfileGeneralTab: FC<ProfileGeneralTabProps> = ({ user }) => {
  const { t } = useTranslation()

  const {
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    data,
    errors
  } = useForm<EditProfileForm>({
    initialValues: getInitialValues(user),
    validations
  })

  const onLanguageChange = (
    _: SyntheticEvent,
    value: EditProfileForm['nativeLanguage']
  ) => {
    handleNonInputValueChange('nativeLanguage', value)
  }

  console.log(data)

  return (
    <Box sx={styles.root}>
      <TitleWithDescription
        description={t('editProfilePage.profile.description')}
        style={styles.headerTitleWithDesc}
        title={t('editProfilePage.profile.title')}
      />

      <Box sx={styles.avatar.root}>
        <Avatar
          src={
            user.photo &&
            `${import.meta.env.VITE_APP_IMG_USER_URL}${user.photo}`
          }
          sx={styles.avatar.img}
        />
        <Box sx={styles.avatar.textWithButtons}>
          <TitleWithDescription
            description={t('editProfilePage.profile.generalTab.uploadDesc')}
            style={styles.avatar.titleWithDesc}
            title={t('editProfilePage.profile.generalTab.uploadTitle')}
          />
          <Box sx={styles.avatar.buttons}>
            <AppButton
              size={SizeEnum.Medium}
              variant={ButtonVariantEnum.ContainedLight}
            >
              {t('editProfilePage.profile.generalTab.uploadTitle')}
            </AppButton>
            <AppButton size={SizeEnum.Medium} variant={ButtonVariantEnum.Tonal}>
              {t('common.remove')}
            </AppButton>
          </Box>
        </Box>
      </Box>

      <Box sx={styles.section}>
        <TitleWithDescription
          description={t('editProfilePage.profile.generalTab.informationDesc')}
          style={styles.sectionsTitleWithDesc}
          title={t('editProfilePage.profile.generalTab.informationTitle')}
        />
        <Box sx={styles.dividedInputs}>
          <AppTextField
            errorMsg={t(errors.firstName)}
            fullWidth
            label={t('common.labels.firstName')}
            onBlur={handleBlur('firstName')}
            onChange={handleInputChange('firstName')}
            required
            value={data.firstName}
          />
          <AppTextField
            errorMsg={t(errors.lastName)}
            fullWidth
            label={t('common.labels.lastName')}
            onBlur={handleBlur('lastName')}
            onChange={handleInputChange('lastName')}
            required
            value={data.lastName}
          />
        </Box>
      </Box>

      <Box sx={styles.section}>
        <TitleWithDescription
          description={t('editProfilePage.profile.generalTab.locationDesc')}
          style={styles.sectionsTitleWithDesc}
          title={t('editProfilePage.profile.generalTab.locationTitle')}
        />
        <Box sx={styles.dividedInputs}>
          <LocationSelectionInputs<EditProfileForm>
            data={data}
            onDataChange={handleNonInputValueChange}
          />
        </Box>
      </Box>

      <Box sx={styles.section}>
        <TitleWithDescription
          description={t('becomeTutor.generalInfo.textFieldLabel')}
          style={styles.sectionsTitleWithDesc}
          title={t('editProfilePage.profile.generalTab.professionalHeadline')}
        />
        <AppTextArea
          InputLabelProps={{
            style: styles.professionalSummaryLabel(data.professionalSummary),
            shrink: false
          }}
          fullWidth
          label={t('becomeTutor.experience.textFieldLabel')}
          maxLength={200}
          onChange={handleInputChange('professionalSummary')}
          value={data.professionalSummary}
        />
      </Box>

      <Box sx={styles.section}>
        <TitleWithDescription
          description={t('editProfilePage.profile.generalTab.languagesDesc')}
          style={styles.sectionsTitleWithDesc}
          title={t('editProfilePage.profile.generalTab.languagesTitle')}
        />
        <AppAutoComplete
          onChange={onLanguageChange}
          options={languages}
          textFieldProps={{
            label: t('becomeTutor.languages.autocompleteLabel'),
            sx: styles.languageInput
          }}
          value={data.nativeLanguage}
        />
      </Box>

      <Box sx={styles.section}>
        <TitleWithDescription
          description={t(
            'editProfilePage.profile.generalTab.videoPresentationDesc'
          )}
          style={styles.sectionsTitleWithDesc}
          title={t('tutorProfilePage.videoPresentation.title')}
        />
        <AppTextField
          InputProps={{
            startAdornment: (
              <InputAdornment
                disablePointerEvents
                position={PositionEnum.Start}
                sx={styles.linkAdornment}
              >
                https://
              </InputAdornment>
            )
          }}
          fullWidth
        />
      </Box>
    </Box>
  )
}

export default ProfileGeneralTab
