import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { AxiosResponse } from 'axios'
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
import { useAppDispatch } from '~/hooks/use-redux'
import { ResourceService } from '~/services/resource-service'
import useAxios from '~/hooks/use-axios'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import Loader from '~/components/loader/Loader'

import { snackbarVariants } from '~/constants'
import { authRoutes } from '~/router/constants/authRoutes'
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
  ResourcesTypesEnum as ResourceType,
  UpdateQuizParams,
  CategoryNameInterface,
  PositionEnum
} from '~/types'
import { getErrorMessage } from '~/utils/error-with-message'
import { createUrlPath } from '~/utils/helper-functions'

import { styles } from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import useChangeConfirm from '~/hooks/use-change-confirm'
import ChangeConfirm from '~/components/changing-confirm/ChangeConfirm'

const CreateOrEditQuizContainer = ({
  title,
  setTitle,
  description,
  setDescription,
  questions,
  setQuestions,
  category,
  setCategory,
  setSettings
}: QuizContentProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
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

  const navigateToQuizzesTab = () => {
    navigate(
      createUrlPath(authRoutes.myResources.root.path, '', { tab: 'quizzes' })
    )
  }

  const handleResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: id
          ? 'myResourcesPage.quizzes.successEditedQuiz'
          : 'myResourcesPage.quizzes.successAddedQuiz'
      })
    )
    navigateToQuizzesTab()
  }

  const onResponseError = (error?: ErrorResponse) => {
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
    setSettings(quiz.settings)
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

  const onSaveQuiz = () =>
    id
      ? void fetchEditedQuiz({
          id,
          title,
          description,
          items: questions,
          category
        })
      : void addNewQuiz({
          title,
          description,
          items: questions,
          category,
          resourceType: ResourceType.Quiz
        })

  const { openDialog, onCloseDialog, coursesFiltered, onSubmitButtonClick } =
    useChangeConfirm(id)

  if (getQuizLoading) {
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
      <span>
        <AppButton
          disabled={isCreationOpen}
          onClick={onOpenCreateQuestion}
          size={SizeEnum.ExtraLarge}
          variant={ButtonVariantEnum.Tonal}
        >
          {t('myResourcesPage.quizzes.createNewQuestion')}
          <EditIcon fontSize={SizeEnum.Small} />
        </AppButton>
      </span>
    </Tooltip>
  )

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
            setQuestions={setQuestions}
          />
        )}
        <Box sx={styles.functionalButtons}>
          {CreateQuestionButton}
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
            onClick={navigateToQuizzesTab}
            size={SizeEnum.ExtraLarge}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.cancel')}
          </AppButton>
          <AppButton
            onClick={coursesFiltered.length ? onSubmitButtonClick : onSaveQuiz}
            size={SizeEnum.ExtraLarge}
            type={ButtonTypeEnum.Submit}
          >
            {t('common.save')}
          </AppButton>
        </Box>
        <ChangeConfirm
          courseList={coursesFiltered}
          onClose={onCloseDialog}
          onSubmit={onSaveQuiz}
          open={openDialog}
          title={title}
        />
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditQuizContainer
