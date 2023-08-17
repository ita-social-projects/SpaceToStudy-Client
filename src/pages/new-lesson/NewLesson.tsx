import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import { useModalContext } from '~/context/modal-context'
import { ResourceService } from '~/services/resource-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AppTextField from '~/components/app-text-field/AppTextField'
import AppButton from '~/components/app-button/AppButton'
import FileEditor from '~/components/file-editor/FileEditor'

import {
  validations,
  initialValues,
  myResourcesPath
} from '~/pages/new-lesson/NewLesson.constants'
import { snackbarVariants } from '~/constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  ErrorResponse,
  SizeEnum,
  NewLessonData,
  TextFieldVariantEnum
} from '~/types'
import { styles } from '~/pages/new-lesson/NewLesson.styles'
import AddAttachments from '~/containers/add-attachments/AddAttachments'

const NewLesson = () => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const { setAlert } = useSnackBarContext()
  const navigate = useNavigate()

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'newLesson.successMessage'
    })
    navigate('/my-resources')
  }

  const addLesson = (): Promise<AxiosResponse> => {
    return ResourceService.addLesson(data)
  }

  const openAddAttachmentsDialog = () => {
    openModal({ component: <AddAttachments /> })
  }

  const { fetchData } = useAxios({
    service: addLesson,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const { data, errors, handleInputChange, handleSubmit } =
    useForm<NewLessonData>({
      initialValues,
      validations,
      onSubmit: fetchData,
      submitWithData: true
    })
  return (
    <PageWrapper>
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.root}
      >
        <AppTextField
          InputLabelProps={styles.titleLabel}
          InputProps={styles.titleInput}
          errorMsg={t(errors.title)}
          fullWidth
          inputProps={styles.input}
          label={data.title ? '' : t('newLesson.labels.title')}
          onChange={handleInputChange('title')}
          value={data.title}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={styles.descriptionLabel}
          InputProps={styles.descriptionInput}
          errorMsg={t(errors.description)}
          fullWidth
          inputProps={styles.input}
          label={data.description ? '' : t('newLesson.labels.description')}
          onChange={handleInputChange('description')}
          value={data.description}
          variant={TextFieldVariantEnum.Standard}
        />
        <Divider sx={styles.divider} />
        <AppButton
          onClick={openAddAttachmentsDialog}
          sx={styles.addAttachmentBtn}
        >
          {t('myResourcesPage.lessons.attachmentsQty')}
          <AddIcon sx={styles.addAttachmentIcon} />
        </AppButton>
        <FileEditor />
        <Box sx={styles.buttons}>
          <AppButton size={SizeEnum.ExtraLarge} type={ButtonTypeEnum.Submit}>
            {t('common.save')}
          </AppButton>
          <AppButton
            component={Link}
            size={SizeEnum.ExtraLarge}
            to={myResourcesPath}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default NewLesson
