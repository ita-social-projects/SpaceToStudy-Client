<<<<<<< HEAD:src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx
<<<<<<< HEAD:src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx
import { useState, useEffect, useCallback } from 'react'
=======
import { useState, useCallback  } from 'react'
>>>>>>> 4bf6336 (Small fix):src/pages/new-lesson/NewLesson.tsx
=======
import { useState, useCallback } from 'react'
>>>>>>> 8e16e12 (fix):src/pages/new-lesson/NewLesson.tsx
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import Loader from '~/components/loader/Loader'
import AddAttachments from '~/containers/add-attachments/AddAttachments'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { attachmentService } from '~/services/attachment-service'
import { useModalContext } from '~/context/modal-context'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import FileEditor from '~/components/file-editor/FileEditor'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { useSnackBarContext } from '~/context/snackbar-context'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { ResourceService } from '~/services/resource-service'

import AddDocuments from '~/containers/add-documents/AddDocuments'

import { snackbarVariants } from '~/constants'
import {
  initialValues,
  defaultResponse,
  myResourcesPath,
  validations
} from '~/pages/create-or-edit-lesson/CreateOrEditLesson.constants'
import { styles } from '~/pages/create-or-edit-lesson/CreateOrEditLesson.styles'
import { authRoutes } from '~/router/constants/authRoutes'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  ErrorResponse,
  Lesson,
  LessonData,
  SizeEnum,
  TextFieldVariantEnum,
  Attachment
} from '~/types'

const CreateOrEditLesson = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
<<<<<<< HEAD:src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx
<<<<<<< HEAD:src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx
=======
  const navigate = useNavigate()
>>>>>>> 4bf6336 (Small fix):src/pages/new-lesson/NewLesson.tsx
=======
>>>>>>> 8e16e12 (fix):src/pages/new-lesson/NewLesson.tsx

  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const [attachments, setAttachments] = useState<Attachment[]>([])
  const [content, setContent] = useState<string>('')
  const { id } = useParams()

  const formData = new FormData()

<<<<<<< HEAD:src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx
  const createAttachments = useCallback(
    (data?: FormData) => attachmentService.createAttachments(data),
    []
  )

  const handleOpenModal = () => openModal({ component: <AddAttachments /> })
=======
  const handleOpenModal = () =>
    openModal({
      component: (
        <AddAttachments
          attachments={attachments}
          onAddAttachments={setAttachments}
        />
      )
    })
>>>>>>> 8e16e12 (fix):src/pages/new-lesson/NewLesson.tsx

  const handleResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: id
        ? 'newLesson.successEditedLesson'
        : 'newLesson.successAddedLesson'
    })
    navigate(authRoutes.myResources.root.route)
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

  const handleEdit = (content: string) => {
    setContent(content)
  }

  const addLesson = (): Promise<AxiosResponse> => {
    const lesson = {
      ...data,
      content,
      attachments: attachments.map((attachment) => attachment._id)
    }
    return ResourceService.addLesson(lesson)
  }

  const { fetchData: fetchAddLesson } = useAxios<Lesson, LessonData>({
    service: addLesson,
    fetchOnMount: false,
    defaultResponse,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

  const editLesson = (): Promise<AxiosResponse> => {
    return ResourceService.editLesson(data, id)
  }

  const { fetchData: fetchEditedLesson } = useAxios<null, LessonData>({
    service: editLesson,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError: handleResponseError
  })

<<<<<<< HEAD:src/pages/create-or-edit-lesson/CreateOrEditLesson.tsx
  const {
    data,
    errors,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit
  } = useForm<LessonData>({
    initialValues,
    validations,
    onSubmit: id ? fetchEditedLesson : fetchAddLesson,
    submitWithData: true
  })

  const getLesson = (id?: string): Promise<AxiosResponse> => {
    return ResourceService.getLesson(id)
  }

  const handleResponseLesson = (lesson: LessonData) => {
    for (const key in data) {
      const validKey = key as keyof LessonData
      handleNonInputValueChange(validKey, lesson[validKey])
    }
  }

  const { loading: getLessonLoading, fetchData: fetchDataLesson } = useAxios<
    Lesson,
    string
  >({
    service: getLesson,
    fetchOnMount: false,
    defaultResponse,
    onResponse: handleResponseLesson,
    onResponseError: handleResponseError
  })

  useEffect(() => {
    if (id) void fetchDataLesson(id)
  }, [id, fetchDataLesson])

  if (getLessonLoading) {
    return <Loader pageLoad />
  }

  const onCreateAttachmentsError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.code}` : ''
    })
  }
  const { fetchData: fetchDataAttachments } = useAxios({
    service: createAttachments,
    fetchOnMount: false,
    defaultResponse: null,
    onResponseError: onCreateAttachmentsError
  })
  const handleOpenModal = () => openModal({ component: <AddAttachments /> })

=======
  const { data, errors, handleInputChange, handleSubmit } =
    useForm<NewLessonData>({
      initialValues,
      validations,
      onSubmit: fetchData,
      submitWithData: true
    })
>>>>>>> 4bf6336 (Small fix):src/pages/new-lesson/NewLesson.tsx

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
          label={data.title ? '' : t('lesson.labels.title')}
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
          label={data.description ? '' : t('lesson.labels.description')}
          onChange={handleInputChange('description')}
          value={data.description}
          variant={TextFieldVariantEnum.Standard}
        />
        <Divider sx={styles.divider} />
        <AppButton
          onClick={handleOpenAddAttachmentsModal}
          sx={styles.addAttachments}
        >
          {t('lesson.labels.attachments')} <AddIcon sx={styles.addIcon} />
        </AppButton>
        <FileEditor onEdit={handleEdit} value={content} />
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

export default CreateOrEditLesson
