import { ChangeEvent, FC, FocusEvent, SyntheticEvent } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'
import AppAutoComplete from '~/components/app-auto-complete/AppAutoComplete'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import LocationSelectionInputs from '~/components/location-selection-inputs/LocationSelectionInputs'
import FileUploader from '~/components/file-uploader/FileUploader'
import DragAndDrop from '~/components/drag-and-drop/DragAndDrop'

import {
  ButtonVariantEnum,
  EditProfileForm,
  FormNonInputValueChange,
  PositionEnum,
  SizeEnum,
  UploadFileEmitterArgs,
  UseFormErrors,
  UseFormEventHandler
} from '~/types'

import { languages } from '~/containers/tutor-home-page/language-step/constants'
import { validationData } from '~/containers/tutor-home-page/add-photo-step/constants'
import { useAppDispatch } from '~/hooks/use-redux'
import { snackbarVariants } from '~/constants'
import { imageResize } from '~/utils/image-resize'
import { styles } from '~/containers/edit-profile/profile-tab/profile-tab-form/ProfileTabForm.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { createUrlPath } from '~/utils/helper-functions'

export interface ProfileTabFormProps {
  data: EditProfileForm
  errors: UseFormErrors<EditProfileForm>
  handleInputChange: UseFormEventHandler<
    EditProfileForm,
    ChangeEvent<HTMLInputElement>
  >
  handleNonInputValueChange: FormNonInputValueChange<
    EditProfileForm[keyof EditProfileForm],
    EditProfileForm
  >
  handleBlur: UseFormEventHandler<EditProfileForm, FocusEvent<HTMLInputElement>>
}

const ProfileTabForm: FC<ProfileTabFormProps> = ({
  data,
  errors,
  handleInputChange,
  handleNonInputValueChange,
  handleBlur
}) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const onLanguageChange = (
    _: SyntheticEvent,
    value: EditProfileForm['nativeLanguage']
  ) => {
    handleNonInputValueChange('nativeLanguage', value)
  }

  const resizeImage = async (photo: File) => {
    try {
      const originalPhotoPath = URL.createObjectURL(photo)
      const photoSizes = { newWidth: 440, newHeight: 440 }

      const resizedPhoto = await imageResize(originalPhotoPath, photoSizes)
      handleNonInputValueChange('photo', {
        src: resizedPhoto,
        name: photo.name
      })
    } catch (error) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: t('becomeTutor.photo.resizeImage')
        })
      )
    }
  }

  const addPhoto = ({ files, error }: UploadFileEmitterArgs) => {
    if (error) {
      dispatch(
        openAlert({
          severity: snackbarVariants.error,
          message: error
        })
      )
      return
    }

    void resizeImage(files[0])
  }
  const handleRemovePhoto = () => {
    const updatedPhoto =
      typeof photo === 'string' ? null : { src: '', name: '' }
    handleNonInputValueChange('photo', updatedPhoto)
  }

  const { photo } = data
  const photoToDisplay =
    typeof photo === 'string'
      ? photo && createUrlPath(import.meta.env.VITE_APP_IMG_USER_URL, photo)
      : photo?.src

  return (
    <Box sx={styles.profileGeneralTabContainer}>
      <Box id='photo' sx={styles.avatar.root}>
        <DragAndDrop
          emitter={addPhoto}
          style={{ root: styles.avatar.img }}
          validationData={validationData}
        >
          <AvatarIcon
            firstName={data.firstName}
            lastName={data.lastName}
            photo={photoToDisplay}
            sx={styles.avatar.img}
          />
        </DragAndDrop>
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
              size={SizeEnum.Large}
              validationData={validationData}
              variant={ButtonVariantEnum.ContainedLight}
            />
            <AppButton
              onClick={handleRemovePhoto}
              size={SizeEnum.Large}
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

      <Box id='video' sx={styles.section}>
        <TitleWithDescription
          description={t(
            'editProfilePage.profile.generalTab.videoPresentationDesc'
          )}
          style={styles.sectionsTitleWithDesc}
          title={t('userProfilePage.videoPresentation.title')}
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
          value={data.videoLink.replace('https://', '')}
        />
      </Box>
    </Box>
  )
}

export default ProfileTabForm
