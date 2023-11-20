import {
  HTMLAttributes,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import Loader from '~/components/loader/Loader'
import AddResources from '~/containers/add-resources/AddResources'
import IconExtensionWithTitle from '~/components/icon-extension-with-title/IconExtensionWithTitle'

import { useModalContext } from '~/context/modal-context'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import FileEditor from '~/components/file-editor/FileEditor'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import AddCategoriesModal from '~/containers/my-resources/add-categories-modal/AddCategoriesModal'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import { useSnackBarContext } from '~/context/snackbar-context'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import { ResourceService } from '~/services/resource-service'

import { snackbarVariants } from '~/constants'
import {
  initialValues,
  defaultResponse,
  myResourcesPath,
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
  CreateCategoriesParams,
  CategoryNameInterface,
  Categories,
  TypographyVariantEnum
} from '~/types'

const CreateOrEditLesson = () => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()

  const { openModal, closeModal } = useModalContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isFetched, setIsFetched] = useState<boolean>(false)

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
        ? t('lesson.successEditedLesson')
        : t('lesson.successAddedLesson')
    })
    navigate(authRoutes.myResources.root.path)
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
          resourceType={ResourcesTabsEnum.Attachments}
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

  const createCategory = useCallback(
    (params?: CreateCategoriesParams) =>
      ResourceService.createResourceCategory(params),
    []
  )

  const onResponseCategory = useCallback(
    (response: Categories | null) => {
      const categoryName = response ? response.name : ''

      setAlert({
        severity: snackbarVariants.success,
        message: t('myResourcesPage.categories.successCreation', {
          category: categoryName
        })
      })

      setIsFetched(false)
    },
    [setAlert, t]
  )

  const { fetchData: handleCreateCategory } = useAxios({
    service: createCategory,
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onResponseCategory,
    onResponseError: handleResponseError
  })

  const onCreateCategory = () => {
    openModal({
      component: (
        <AddCategoriesModal
          closeModal={closeModal}
          createCategories={handleCreateCategory}
        />
      )
    })
  }

  const getCategories = useCallback(() => {
    setIsFetched(true)
    return ResourceService.getResourcesCategoriesNames()
  }, [])

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

  const categoryOptionsList = (
    props: HTMLAttributes<HTMLLIElement>,
    option: string,
    index: number
  ) => (
    <Box key={index}>
      {index === 0 && (
        <Box>
          <AppButton
            disableRipple
            fullWidth
            onClick={onCreateCategory}
            size={SizeEnum.Medium}
            sx={styles.addButton}
            variant={ButtonVariantEnum.Text}
          >
            <AddIcon />
            {t('myResourcesPage.categories.addBtn')}
          </AppButton>
          <Divider sx={styles.divider} />
        </Box>
      )}
      <Box component={ComponentEnum.Li} {...(props as [])}>
        {option}
      </Box>
    </Box>
  )

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
        <Box sx={styles.labelCategory}>
          <Typography variant={TypographyVariantEnum.Body2}>
            {t('questionPage.chooseCategory')}
          </Typography>
          <AsyncAutocomplete<CategoryNameInterface>
            fetchCondition={!isFetched}
            fetchOnFocus
            labelField='name'
            onChange={onCategoryChange}
            renderOption={(props, option, state) =>
              categoryOptionsList(props, option.name, state.index)
            }
            service={getCategories}
            textFieldProps={{
              label: t('myResourcesPage.categories.categoryDropdown')
            }}
            value={data.category}
            valueField='_id'
          />
        </Box>
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
