import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import AddResources from '~/containers/add-resources/AddResources'
import CreateOrEditQuizQuestion from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import QuestionsList from '~/containers/questions-list/QuestionsList'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import useAxios from '~/hooks/use-axios'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Loader from '~/components/loader/Loader'

import { snackbarVariants } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
import { myResourcesPath } from '~/pages/create-or-edit-lesson/CreateOrEditLesson.constants'
import { QuizContentProps } from '~/pages/new-quiz/NewQuiz.constants'
import {
  columns,
  removeColumnRules
} from '~/containers/add-resources/AddQuestions.constants'
import { defaultResponse } from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer.constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ErrorResponse,
  CreateQuizParams,
  Question,
  Quiz,
  SizeEnum,
  TextFieldVariantEnum,
  ResourcesTabsEnum,
  UpdateQuizParams,
  CategoryNameInterface
} from '~/types'
import { getErrorMessage } from '~/utils/error-with-message'
import { styles } from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer.styles'

const CreateOrEditQuizContainer = ({
  title,
  setTitle,
  description,
  setDescription,
  questions,
  setQuestions,
  category,
  setCategory
}: QuizContentProps) => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isCreationOpen, setIsCreationOpen] = useState<boolean>(false)

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    setCategory(value?._id ?? null)
  }

  const handleResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: id
        ? t('myResourcesPage.quizzes.successEditedQuiz')
        : t('myResourcesPage.quizzes.successAddedQuiz')
    })
    navigate(authRoutes.myResources.root.path)
  }

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error
        ? t(`errors.${error.code}`, {
            message: getErrorMessage(error.message)
          })
        : ''
    })
  }

  const createQuizService = useCallback(
    (data?: CreateQuizParams) => ResourceService.addQuiz(data),
    []
  )

  const { fetchData: addNewQuiz } = useAxios<Quiz, CreateQuizParams>({
    service: createQuizService,
    fetchOnMount: false,
    defaultResponse,
    onResponse: handleResponse,
    onResponseError
  })

  const editQuizService = useCallback(
    (params?: UpdateQuizParams) => ResourceService.editQuiz(params),
    []
  )

  const { fetchData: fetchEditedQuiz } = useAxios<null, UpdateQuizParams>({
    service: editQuizService,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse: handleResponse,
    onResponseError
  })

  const getQuiz = (id?: string): Promise<AxiosResponse> => {
    return ResourceService.getQuiz(id)
  }

  const handleGetQuizResponse = (quiz: Quiz) => {
    setTitle(quiz.title)
    setDescription(quiz.description)
    setQuestions(quiz.items)
    setCategory(quiz.category)
  }

  const { loading: getQuizLoading, fetchData: fetchQuizData } = useAxios<
    Quiz,
    string
  >({
    service: getQuiz,
    fetchOnMount: false,
    defaultResponse,
    onResponse: handleGetQuizResponse,
    onResponseError
  })

  useEffect(() => {
    if (id) {
      void fetchQuizData(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    isCreationOpen && setIsCreationOpen(false)
  }, [isCreationOpen])

  if (getQuizLoading) {
    return <Loader pageLoad />
  }

  const onOpenAddQuestionsModal = () => {
    openModal({
      component: (
        <AddResources<Question>
          columns={columns}
          onAddResources={onAddQuestions}
          removeColumnRules={removeColumnRules}
          requestService={ResourceService.getQuestions}
          resourceType={ResourcesTabsEnum.Questions}
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

  const onSaveQuiz = () =>
    id
      ? void fetchEditedQuiz({
          id,
          title,
          description,
          items: questions,
          category
        })
      : void addNewQuiz({ title, description, items: questions, category })

  return (
    <PageWrapper sx={styles.container}>
      <Box sx={styles.root}>
        <AppTextField
          InputLabelProps={styles.titleLabel(!!title)}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={styles.input}
          label={t('myResourcesPage.quizzes.defaultNewTitle')}
          onChange={onTitleChange}
          value={title}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={styles.descriptionLabel(!!description)}
          InputProps={styles.descriptionInput}
          fullWidth
          inputProps={styles.input}
          label={t('myResourcesPage.quizzes.defaultNewDescription')}
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
            setQuestions={setQuestions}
          />
        )}
        <Box sx={styles.functionalButtons}>
          <AppButton
            onClick={onOpenCreateQuestion}
            size={SizeEnum.ExtraLarge}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('myResourcesPage.quizzes.createNewQuestion')}
            <EditIcon fontSize={SizeEnum.Small} />
          </AppButton>
          <AppButton
            onClick={onOpenAddQuestionsModal}
            size={SizeEnum.ExtraLarge}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('myResourcesPage.quizzes.addQuestion')}
            <AddIcon fontSize={SizeEnum.Small} />
          </AppButton>
        </Box>
        <Box sx={styles.buttons}>
          <AppButton
            component={Link}
            size={SizeEnum.ExtraLarge}
            to={myResourcesPath}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
          <AppButton
            onClick={onSaveQuiz}
            size={SizeEnum.ExtraLarge}
            type={ButtonTypeEnum.Submit}
          >
            {t('common.save')}
          </AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditQuizContainer
