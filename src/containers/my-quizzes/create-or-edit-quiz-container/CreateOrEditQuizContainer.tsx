import {
  useCallback,
  useEffect,
  useState,
  useRef,
  type ComponentRef,
  type ChangeEvent
} from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'

import AddResources from '~/containers/add-resources/AddResources'
import CreateOrEditQuizQuestion from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import QuestionsList from '~/containers/questions-list/QuestionsList'
import { useModalContext } from '~/context/modal-context'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import { ResourceService } from '~/services/resource-service'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import Button from '~scss-components/button/Button'
import AppTextField from '~/components/app-text-field/AppTextField'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Loader from '~/components/loader/Loader'

import { snackbarVariants } from '~/constants'
import { getFullUrl } from '~/utils/get-full-url'
import { authRoutes } from '~/router/constants/authRoutes'
import { QuizContentProps } from '~/pages/new-quiz/NewQuiz.constants'
import {
  columns,
  removeColumnRules
} from '~/containers/add-resources/AddQuestions.constants'
import {
  type Question,
  type Quiz,
  type CategoryNameInterface,
  ButtonTypeEnum,
  SizeEnum,
  TextFieldVariantEnum,
  ResourcesTabsEnum,
  ResourcesTypesEnum as ResourceType,
  PositionEnum
} from '~/types'

import { styles } from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer.styles'

const CreateOrEditQuizContainer: React.FC<QuizContentProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  questions,
  setQuestions,
  category,
  setCategory,
  setSettings
}) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { handleErrorAlert, handleAlert } = useSnackbarAlert()
  const [isCreationOpen, setIsCreationOpen] = useState<boolean>(false)
  const modalRef = useRef<ComponentRef<typeof CreateOrEditQuizQuestion> | null>(
    null
  )

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setCategory(value?._id ?? null)
  }

  const navigateToQuizzesTab = () => {
    navigate(
      getFullUrl({
        pathname: authRoutes.myResources.root.path,
        searchParameters: { tab: 'quizzes' }
      })
    )
  }

  const handleResponse = () => {
    handleAlert({
      severity: snackbarVariants.success,
      message: id
        ? 'myResourcesPage.quizzes.successEditedQuiz'
        : 'myResourcesPage.quizzes.successAddedQuiz'
    })
    navigateToQuizzesTab()
  }

  const { mutate: createQuiz, isPending: createQuizPending } = useMutation({
    queryKey: ['quizzes'],
    mutationFn: ResourceService.addQuiz,
    onSuccess: handleResponse,
    onError: handleErrorAlert
  })

  const { mutate: updateQuiz, isPending: updateQuizPending } = useMutation({
    queryKeys: [['quizzes'], ['quiz', id]],
    mutationFn: ResourceService.editQuiz,
    onSuccess: handleResponse,
    onError: handleErrorAlert
  })

  const getQuiz = useCallback(() => {
    return ResourceService.getQuiz(id)
  }, [id])

  const handleGetQuizResponse = useCallback(
    (quiz: Quiz) => {
      setTitle(quiz.title)
      setDescription(quiz.description)
      setQuestions(quiz.items)
      setCategory(typeof quiz.category === 'string' ? quiz.category : null)
      setSettings(quiz.settings)
    },
    [setTitle, setDescription, setQuestions, setCategory, setSettings]
  )

  const {
    data: quiz,
    isLoading,
    error
  } = useQuery({
    queryKey: ['quiz', id],
    queryFn: getQuiz,
    options: {
      enabled: Boolean(id),
      staleTime: Infinity
    }
  })

  useEffect(() => {
    if (error) {
      handleErrorAlert(error)
    }
  }, [handleErrorAlert, error])

  useEffect(() => {
    if (quiz) {
      handleGetQuizResponse(quiz)
    }
  }, [handleGetQuizResponse, quiz])

  const onOpenAddQuestionsModal = () => {
    openModal({
      component: (
        <AddResources<Question>
          columns={columns}
          onAddResources={onAddQuestions}
          removeColumnRules={removeColumnRules}
          requestService={ResourceService.getQuestions}
          resourceTab={ResourcesTabsEnum.Questions}
          resources={questions}
        />
      )
    })
  }

  const onAddQuestions = (attachments: Question[]) => {
    setQuestions(attachments)
  }

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const onOpenCreateQuestion = () => setIsCreationOpen(true)

  const onCloseCreateQuestion = () => setIsCreationOpen(false)

  useEffect(() => {
    if (isCreationOpen) {
      modalRef.current?.openCreateModal()
    }
  }, [isCreationOpen])

  const onSaveQuiz = () =>
    id
      ? updateQuiz({
          id,
          title,
          description,
          items: questions,
          category: category ? { _id: category, name: '' } : null
        })
      : createQuiz({
          title,
          description,
          items: questions,
          category: category ? { _id: category, name: '' } : null,
          resourceType: ResourceType.Quiz
        })

  if (isLoading) {
    return <Loader pageLoad />
  }

  const CreateQuestionButton = (
    <Tooltip
      arrow
      placement={PositionEnum.Top}
      title={
        isCreationOpen ? t('myResourcesPage.quizzes.savePreviousQuestion') : ''
      }
    >
      <Button
        disabled={isCreationOpen}
        endIcon={<EditIcon fontSize={SizeEnum.Small} />}
        onClick={onOpenCreateQuestion}
        size='lg'
        variant='tonal'
      >
        {t('myResourcesPage.quizzes.createNewQuestion')}
      </Button>
    </Tooltip>
  )

  return (
    <PageWrapper sx={styles.container}>
      <Box sx={styles.root}>
        <AppTextField
          InputLabelProps={styles.titleLabel(Boolean(title))}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={styles.input}
          label={t('myResourcesPage.quizzes.defaultNewTitle')}
          onChange={onTitleChange}
          value={title}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={styles.descriptionLabel(Boolean(description))}
          InputProps={styles.descriptionInput}
          fullWidth
          inputProps={styles.input}
          label={t('myResourcesPage.quizzes.defaultNewDescription')}
          maxRows={3}
          multiline
          onChange={onDescriptionChange}
          value={description}
          variant={TextFieldVariantEnum.Standard}
        />
        <CategoryDropdown
          category={category}
          onCategoryChange={onCategoryChange}
        />
        <Divider sx={styles.divider} />
        {questions && (
          <QuestionsList items={questions} setItems={setQuestions} />
        )}
        {isCreationOpen && (
          <CreateOrEditQuizQuestion
            onCancel={onCloseCreateQuestion}
            ref={modalRef}
            setQuestions={setQuestions}
          />
        )}
        <Box sx={styles.functionalButtons}>
          {CreateQuestionButton}
          <Button
            endIcon={<AddIcon fontSize={SizeEnum.Small} />}
            onClick={onOpenAddQuestionsModal}
            size='lg'
            variant='tonal'
          >
            {t('myResourcesPage.quizzes.addQuestion')}
          </Button>
        </Box>
        <Box sx={styles.buttons}>
          <Button onClick={navigateToQuizzesTab} size='lg' variant='tonal'>
            {t('common.cancel')}
          </Button>
          <Button
            loading={createQuizPending || updateQuizPending}
            onClick={onSaveQuiz}
            size='lg'
            type={ButtonTypeEnum.Submit}
          >
            {t('common.save')}
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditQuizContainer
