import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CheckBox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import LockIcon from '@mui/icons-material/Lock'

import { useAppSelector } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { userService } from '~/services/user-service'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import Loader from '~/components/loader/Loader'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'

import { defaultResponses } from '~/constants'
import { styles } from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote.styles'
import {
  TextFieldVariantEnum,
  ButtonVariantEnum,
  SizeEnum,
  TypographyVariantEnum,
  CreateOrUpdateNoteParams,
  NoteResponse,
  ComponentEnum,
  ButtonTypeEnum,
  UserResponse,
  UserRole
} from '~/types'

interface CreateOrEditNoteProps {
  note?: NoteResponse
  onSubmitLoading: boolean
  onSubmit: (data: CreateOrUpdateNoteParams) => Promise<void>
  onCloseNote: () => void
}

const CreateOrEditNote = ({
  note,
  onSubmitLoading,
  onSubmit,
  onCloseNote
}: CreateOrEditNoteProps) => {
  const { t } = useTranslation()

  const { userId, userRole } = useAppSelector((state) => state.appMain)

  const getUserData: () => Promise<AxiosResponse<UserResponse>> = useCallback(
    () => userService.getUserById(userId, userRole as UserRole),
    [userId, userRole]
  )

  const {
    loading,
    response: { photo, firstName, lastName }
  } = useAxios<UserResponse>({
    service: getUserData,
    fetchOnMount: true,
    defaultResponse: defaultResponses.object as UserResponse
  })

  const {
    data,
    isDirty,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit
  } = useForm<CreateOrUpdateNoteParams>({
    initialValues: {
      text: note?.text ?? '',
      isPrivate: note?.isPrivate ?? false
    },
    onSubmit: async () => {
      await onSubmit(data)
    }
  })

  const userPhoto = photo
    ? new URL(photo, import.meta.env.VITE_APP_IMG_USER_URL).href
    : undefined
  const isNameValid = Boolean(firstName && lastName)
  const userName = isNameValid && `${firstName} ${lastName}`

  const userInfo = loading ? (
    <Loader size={20} />
  ) : (
    <>
      <AvatarIcon
        firstName={firstName}
        lastName={lastName}
        photo={userPhoto}
        sx={styles.accountIcon}
      />
      <Typography variant={TypographyVariantEnum.Subtitle2}>
        {userName}
      </Typography>
    </>
  )

  return (
    <Box
      component={ComponentEnum.Form}
      onSubmit={handleSubmit}
      sx={styles.container}
    >
      <Box sx={styles.header}>{userInfo}</Box>
      <AppTextField
        InputLabelProps={styles.descriptionLabel}
        InputProps={styles.descriptionInput}
        fullWidth
        inputProps={{ maxLength: 100 }}
        label={data.text ? '' : t('cooperationsPage.notes.noteText')}
        multiline
        onChange={handleInputChange('text')}
        sx={styles.textfield}
        value={data.text}
        variant={TextFieldVariantEnum.Standard}
      />
      <Box sx={styles.settingsContainer}>
        <FormControlLabel
          checked={data.isPrivate}
          control={<CheckBox />}
          label={
            <Box sx={styles.settingsContainer}>
              <LockIcon fontSize={SizeEnum.Small} sx={styles.lockIcon} />
              <Typography variant={TypographyVariantEnum.Body2}>
                {t('cooperationsPage.notes.privateSetting')}
              </Typography>
            </Box>
          }
          onClick={() =>
            handleNonInputValueChange('isPrivate', !data.isPrivate)
          }
        />
        <Box sx={styles.btnContainer}>
          <AppButton
            onClick={onCloseNote}
            size={SizeEnum.Small}
            sx={styles.noteBtn}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
          <AppButton
            disabled={!isDirty || !data.text}
            loading={onSubmitLoading}
            size={SizeEnum.Small}
            sx={styles.noteBtn}
            type={ButtonTypeEnum.Submit}
          >
            {t('common.save')}
          </AppButton>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateOrEditNote
