import { FC, SyntheticEvent, useEffect, useMemo } from 'react'
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
import FileUploader from '~/components/file-uploader/FileUploader'

import {
  ButtonVariantEnum,
  EditProfileForm,
  PositionEnum,
  ProfileTabProps,
  SizeEnum,
  UpdateUserParams,
  UploadFileEmitterArgs,
  UserRoleEnum
} from '~/types'

import { languages } from '~/containers/tutor-home-page/language-step/constants'
import { validations } from '~/components/user-steps-wrapper/constants'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { useSnackBarContext } from '~/context/snackbar-context'
import { useProfileContext } from '~/context/profile-context'
import { snackbarVariants } from '~/constants'
import { imageResize } from '~/utils/image-resize'
import { styles } from './ProfileGeneralTab.styles'

const ProfileGeneralTab: FC<ProfileTabProps> = ({ user }) => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { profileData, handleProfileData } = useProfileContext()
  const profileGeneralData = profileData.generalData.data
  const photo = profileGeneralData.photo

  const initialValues = {
    ...profileGeneralData,
    country: profileGeneralData.address.country,
    city: profileGeneralData.address.city,
    professionalSummary: profileGeneralData.professionalSummary ?? ''
  }

  const {
    handleInputChange,
    handleBlur,
    handleNonInputValueChange,
    data,
    errors
  } = useForm<EditProfileForm>({
    initialValues,
    validations
  })

  const updatedData: UpdateUserParams = useMemo(
    () => ({
      firstName: data.firstName,
      lastName: data.lastName,
      address: {
        country: data.country ?? '',
        city: data.city ?? ''
      },
      professionalSummary: data.professionalSummary,
      mainSubjects:
        user.role[0] !== UserRoleEnum.Admin
          ? user.mainSubjects[user.role[0]]
          : [],
      nativeLanguage: data.nativeLanguage ?? null,
      videoLink: data.videoLink
    }),
    [data, user.mainSubjects, user.role]
  )

  useEffect(() => {
    handleProfileData(updatedData, errors)
  }, [updatedData, errors, handleProfileData])

  const onLanguageChange = (
    _: SyntheticEvent,
    value: EditProfileForm['nativeLanguage']
  ) => {
    handleNonInputValueChange('nativeLanguage', value)
  }

  const resizeImage = (photo: File) => {
    const originalPhotoPath = URL.createObjectURL(photo)
    const photoSizes = { newWidth: 440, newHeight: 440 }

    imageResize(originalPhotoPath, photoSizes)
      .then((resizedPhoto) => {
        handleProfileData({
          ...updatedData,
          photo: { src: resizedPhoto, name: photo.name }
        })
      })
      .catch(console.error)
  }

  const addPhoto = ({ files, error }: UploadFileEmitterArgs) => {
    if (error) {
      setAlert({
        severity: snackbarVariants.error,
        message: error
      })
      return
    }

    resizeImage(files[0])
  }

  const handleRemovePhoto = () => {
    handleProfileData({
      ...updatedData,
      photo: null
    })
  }

  return (
    <Box sx={styles.profileGeneralTabContainer}>
      <Box sx={styles.avatar.root}>
        <Avatar
          src={
            (photo?.src || user.photo) &&
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
            <FileUploader
              buttonText={t('editProfilePage.profile.generalTab.uploadTitle')}
              emitter={addPhoto}
              validationData={validationData}
              variant={ButtonVariantEnum.ContainedLight}
            />
            <AppButton
              onClick={handleRemovePhoto}
              size={SizeEnum.Medium}
              variant={ButtonVariantEnum.Tonal}
            >
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
            ),
            sx: styles.videoLinkInput
          }}
          errorMsg={t(errors.videoLink)}
          fullWidth
          onBlur={handleBlur('videoLink')}
          onChange={handleInputChange('videoLink')}
          placeholder='youtube.com/my-video'
          value={data.videoLink?.replace('https://', '')}
        />
      </Box>
    </Box>
  )
}

export default ProfileGeneralTab
