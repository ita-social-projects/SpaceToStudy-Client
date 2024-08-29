import { SyntheticEvent, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'

import Loader from '~/components/loader/Loader'
import AddResources from '~/containers/add-resources/AddResources'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { useModalContext } from '~/context/modal-context'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import FileEditor from '~/components/file-editor/FileEditor'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import { useAppDispatch } from '~/hooks/use-redux'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { ResourceService } from '~/services/resource-service'

import { getErrorMessage } from '~/utils/error-with-message'
import { createUrlPath } from '~/utils/helper-functions'
import { snackbarVariants } from '~/constants'
import {
  initialValues,
  defaultResponse,
  validations
} from '~/pages/create-or-edit-lesson/CreateOrEditLesson.constants'
import {
  columns,
  removeColumnRules
} from '~/containers/add-resources/AddAttachments.constants'
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
  Attachment,
  ResourcesTabsEnum,
  CategoryNameInterface
} from '~/types'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import ChangeConfirm from '~/components/changing-confirm/ChangeConfirm'
import useChangeConfirm from '~/hooks/use-change-confirm'

const CreateOrEditLesson = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const { id } = useParams()

  const handleResponseError = (error?: ErrorResponse) => {
    const errorKey = getErrorKey(error)

    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: error
          ? {
              text: errorKey,
              options: {
                message: getErrorMessage(error.message)
              }
            }
          : errorKey
      })
    )
  }
  const navigateToLessonTab = () => {
    navigate(
      createUrlPath(authRoutes.myResources.root.path, '', { tab: 'lessons' })
    )
  }

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: id ? 'lesson.successEditedLesson' : 'lesson.successAddedLesson'
      })
    )
    navigateToLessonTab()
  }

  const handleAddAttachments = (attachments: Attachment[]) => {
    handleNonInputValueChange('attachments', attachments)
  }

  const handleOpenAddAttachmentsModal = () => {
    openModal({
      component: (
        <AddResources<Attachment>
          columns={columns}
          onAddResources={handleAddAttachments}
          removeColumnRules={removeColumnRules}
          requestService={ResourceService.getAttachments}
          resourceTab={ResourcesTabsEnum.Attachments}
          resources={data.attachments}
        />
      )
    })
  }

  const handleRemoveAttachment = (attachmentToDelete: Attachment) => {
    handleNonInputValueChange(
      'attachments',
      data.attachments.filter(
        (attachment) => attachment._id !== attachmentToDelete._id
      )
    )
  }

  const handleEdit = (content: string) => {
    handleNonInputValueChange('content', content)
  }

  const addLesson = (): Promise<AxiosResponse> => {
    return ResourceService.addLesson(data)
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

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleNonInputValueChange('category', value?._id ?? null)
  }

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
    LessonData,
    string
  >({
    service: getLesson,
    fetchOnMount: false,
    defaultResponse,
    onResponse: handleResponseLesson,
    onResponseError: handleResponseError
  })

  const { openDialog, onCloseDialog, coursesFiltered, onSubmitButtonClick } =
    useChangeConfirm(id)

  useEffect(() => {
    if (id) {
      void fetchDataLesson(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (getLessonLoading) {
    return <Loader pageLoad />
  }

  const attachmentsList = data.attachments.map((attachment) => (
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
          InputLabelProps={styles.titleLabel(data.title)}
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
          InputLabelProps={styles.descriptionLabel(data.description)}
          InputProps={styles.descriptionInput}
          errorMsg={t(errors.description)}
          fullWidth
          inputProps={styles.input}
          label={data.description ? '' : t('lesson.labels.description')}
          maxRows={3}
          multiline
          onChange={handleInputChange('description')}
          value={data.description}
          variant={TextFieldVariantEnum.Standard}
        />
        <CategoryDropdown
          category={data.category}
          onCategoryChange={onCategoryChange}
        />
        <Divider sx={styles.divider} />
        <AppButton
          onClick={handleOpenAddAttachmentsModal}
          sx={styles.addAttachments}
        >
          {t('lesson.labels.attachments')} <AddIcon sx={styles.addIcon} />
        </AppButton>
        <FileEditor onEdit={handleEdit} value={data.content} />
        {attachmentsList}
        <Box sx={styles.buttons}>
          <AppButton
            onClick={navigateToLessonTab}
            size={SizeEnum.XXL}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
          <AppButton
            onClick={onSubmitButtonClick}
            size={SizeEnum.XXL}
            type={ButtonTypeEnum.Submit}
          >
            {t('common.save')}
          </AppButton>
        </Box>
        <ChangeConfirm
          courseList={coursesFiltered}
          onClose={onCloseDialog}
          open={openDialog}
          title={data.title}
        />
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditLesson
