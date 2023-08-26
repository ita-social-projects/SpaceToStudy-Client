import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import AddAttachments from '~/containers/add-attachments/AddAttachments'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import FileEditor from '~/components/file-editor/FileEditor'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { useSnackBarContext } from '~/context/snackbar-context'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { ResourceService } from '~/services/resource-service'
import { useModalContext } from '~/context/modal-context'

import { snackbarVariants } from '~/constants'
import {
  initialValues,
  myResourcesPath,
  validations
} from '~/pages/new-lesson/NewLesson.constants'
import { styles } from '~/pages/new-lesson/NewLesson.styles'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  ErrorResponse,
  NewLessonData,
  SizeEnum,
  TextFieldVariantEnum,
  Attachment
} from '~/types'

const NewLesson = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const [attachments, setAttachments] = useState<Attachment[]>([])

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

  const handleAddAttachments = (attachments: Attachment[]) => {
    setAttachments(attachments)
  }

  const handleOpenAddAttachmentsModal = () => {
    openModal({
      component: (
        <AddAttachments
          attachments={attachments}
          onAddAttachments={handleAddAttachments}
        />
      )
    })
  }

  const handleRemoveAttachment = (attachment: Attachment) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter(
        (prevAttachment) => prevAttachment._id !== attachment._id
      )
    )
  }

  const addLesson = (): Promise<AxiosResponse> => {
    const lesson = {
      ...data,
      attachments: attachments.map((attachment) => attachment._id)
    }
    return ResourceService.addLesson(lesson)
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

  const attachmentsList = attachments.map((attachment) => (
    <Box key={attachment.size} sx={styles.attachmentList.container}>
      <IconExtensionWithTitle
        size={attachment.size}
        title={attachment.fileName}
      />
      <IconButton onClick={() => handleRemoveAttachment(attachment)}>
        <CloseIcon />
      </IconButton>
    </Box>
  ))
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
        <Box>
          <AppButton onClick={handleOpenAddAttachmentsModal}>
            {t('newLesson.labels.attachments')} <AddIcon sx={styles.addIcon} />
          </AppButton>
        </Box>
        <FileEditor />
        {attachmentsList}
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
