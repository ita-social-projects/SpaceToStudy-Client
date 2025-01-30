import { useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'

import { IconButton } from '~/design-system/components/icon-button/IconButton'
import AddResources from '~/containers/add-resources/AddResources'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'
import { useModalContext } from '~/context/modal-context'
import Button from '~scss-components/button/Button'
import AppTextField from '~/components/app-text-field/AppTextField'
import FileEditor from '~/components/file-editor/FileEditor'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import useForm from '~/hooks/use-form'
import { ResourceService } from '~/services/resource-service'

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
  ComponentEnum,
  type LessonData,
  TextFieldVariantEnum,
  type Attachment,
  ResourcesTabsEnum,
  type CategoryNameInterface
} from '~/types'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'

const CreateOrEditLesson = () => {
  const { t } = useTranslation()

  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const { handleErrorAlert, handleAlert } = useSnackbarAlert()

  const navigateToLessonTab = () => {
    navigate(
      createUrlPath(authRoutes.myResources.root.path, '', { tab: 'lessons' })
    )
  }

  const handleResponse = () => {
    handleAlert({
      message: id ? 'lesson.successEditedLesson' : 'lesson.successAddedLesson',
      severity: snackbarVariants.success
    })

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
          requestService={ResourceService.getAttachmentsQuery}
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

  const onCategoryChange = (
    _: React.SyntheticEvent,
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
    onSubmit: () => {
      if (id) {
        fetchEditedLesson()
      } else {
        fetchAddLesson()
      }
    },
    submitWithData: true
  })

  const addLesson = useCallback(() => {
    return ResourceService.addLesson(data)
  }, [data])

  const { mutate: fetchAddLesson } = useMutation({
    mutationFn: addLesson,
    onSuccess: handleResponse,
    onError: handleErrorAlert
  })

  const getLesson = useCallback(() => {
    if (id) {
      return ResourceService.getLesson(id)
    }
  }, [id])

  const { error, data: lesson } = useQuery({
    queryKey: ['lesson', id],
    queryFn: getLesson,
    options: {
      initialData: defaultResponse,
      enabled: Boolean(id)
    }
  })

  const editLesson = useCallback(async () => {
    if (id) {
      await ResourceService.editLesson(data, id)
    }
  }, [data, id])

  const { mutate: fetchEditedLesson } = useMutation({
    mutationFn: editLesson,
    onSuccess: handleResponse,
    onError: handleErrorAlert
  })

  useEffect(() => {
    if (lesson && id) {
      for (const key in data) {
        const validKey = key as keyof LessonData
        handleNonInputValueChange(validKey, lesson[validKey])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson, id])

  useEffect(() => {
    if (error) {
      handleErrorAlert(error)
    }
  }, [handleErrorAlert, error])

  const attachmentsList = data.attachments?.map((attachment) => (
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

  const category = typeof data.category === 'string' ? data.category : ''

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
          category={category}
          onCategoryChange={onCategoryChange}
        />
        <Divider sx={styles.divider} />
        <Button
          endIcon={<AddIcon sx={styles.addIcon} />}
          onClick={handleOpenAddAttachmentsModal}
          sx={styles.addAttachments}
        >
          {t('lesson.labels.attachments')}
        </Button>
        <FileEditor onEdit={handleEdit} value={data.content} />
        {attachmentsList}
        <Box sx={styles.buttons}>
          <Button onClick={navigateToLessonTab} size='md' variant='tonal'>
            {t('common.cancel')}
          </Button>
          <Button size='md' type={ButtonTypeEnum.Submit}>
            {t('common.save')}
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditLesson
