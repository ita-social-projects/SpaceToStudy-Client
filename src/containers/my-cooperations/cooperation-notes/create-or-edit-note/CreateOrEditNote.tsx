import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CheckBox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import LockIcon from '@mui/icons-material/Lock'
import useQuery from '~/hooks/use-query'
import { useAppSelector } from '~/hooks/use-redux'
import useForm from '~/hooks/use-form'
import { userService } from '~/services/user-service'
import Button from '~scss-components/button/Button'
import AppTextField from '~/components/app-text-field/AppTextField'
import Loader from '~/components/loader/Loader'
import AvatarIcon from '~/components/avatar-icon/AvatarIcon'

import { styles } from '~/containers/my-cooperations/cooperation-notes/create-or-edit-note/CreateOrEditNote.styles'
import {
  TextFieldVariantEnum,
  SizeEnum,
  TypographyVariantEnum,
  CreateOrUpdateNoteParams,
  NoteResponse,
  ComponentEnum,
  ButtonTypeEnum,
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

  const getUserData = useCallback(() => {
    return userService.getUserByIdWithBaseService(userId, userRole as UserRole)
  }, [userId, userRole])

  const { isLoading: userIsLoading, data: userResponse } = useQuery({
    queryFn: getUserData,
    queryKey: ['user', userId],
    options: {
      staleTime: Infinity
    }
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

  if (userIsLoading || !userResponse) {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <Loader size={20} />
        </Box>
      </Box>
    )
  }

  const userPhoto = userResponse.photo
    ? new URL(userResponse.photo, import.meta.env.VITE_APP_IMG_USER_URL).href
    : undefined
  const userName = `${userResponse.firstName} ${userResponse.lastName}`
  const userInfo = (
    <>
      <AvatarIcon
        firstName={userResponse.firstName}
        lastName={userResponse.lastName}
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
          <Button
            onClick={onCloseNote}
            size='sm'
            sx={styles.noteBtn}
            variant='tonal'
          >
            {t('common.cancel')}
          </Button>
          <Button
            disabled={!isDirty || !data.text}
            loading={onSubmitLoading}
            size='sm'
            sx={styles.noteBtn}
            type={ButtonTypeEnum.Submit}
          >
            {t('common.save')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateOrEditNote
