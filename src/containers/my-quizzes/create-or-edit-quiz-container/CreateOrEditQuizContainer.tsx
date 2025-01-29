import { useCallback, useEffect, useState } from 'react'
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
import { useAppDispatch } from '~/hooks/use-redux'
import { ResourceService } from '~/services/resource-service'
import useMutation from '~/hooks/use-mutation'
import useQuery from '~/hooks/use-query'
import Button from '~scss-components/button/Button'
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
import {
  ButtonTypeEnum,
  ErrorResponse,
  ComponentEnum,
  Question,
  SizeEnum,
  TextFieldVariantEnum,
  ResourcesTabsEnum,
  CategoryNameInterface,
  PositionEnum,
  QuizData
} from '~/types'
import { getErrorMessage } from '~/utils/error-with-message'
import { createUrlPath } from '~/utils/helper-functions'

import { styles } from '~/containers/my-quizzes/create-or-edit-quiz-container/CreateOrEditQuizContainer.styles'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

const CreateOrEditQuizContainer = ({
  data,
  handleInputChange,
  handleNonInputValueChange,
  handleSubmit,
  setMutations
}: QuizContentProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { openModal } = useModalContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const [isCreationOpen, setIsCreationOpen] = useState<boolean>(false)
  const [questions, setQuestions] = useState<Question[]>(data.items || [])

  const onCategoryChange = (
    _: React.SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleNonInputValueChange('category', value?._id ?? null)
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

  const createQuizService = useCallback(() => {
    return ResourceService.addQuizQuery(data)
  }, [data])

  const { mutate: fetchAddQuiz } = useMutation({
    mutationFn: createQuizService,
    onSuccess: handleResponse,
    onError: onResponseError
  })

  const editQuiz = useCallback(async () => {
    if (id) {
      await ResourceService.editQuizQuery(data, id)
    }
  }, [data, id])

  const { mutate: fetchEditedQuiz } = useMutation({
    mutationFn: editQuiz,
    onSuccess: handleResponse,
    onError: onResponseError
  })

  const getQuiz = useCallback(() => {
    if (id) {
      return ResourceService.getQuizQuery(id)
    }
    return null
  }, [id])

  const {
    data: quiz,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['quiz', id],
    queryFn: getQuiz,
    options: {
      enabled: Boolean(id)
    }
  })

  useEffect(() => {
    if (quiz && id) {
      for (const key in quiz) {
        const validKey = key as keyof QuizData
        handleNonInputValueChange(validKey, quiz[validKey])
      }
      if (quiz.items) {
        setQuestions(quiz.items)
      }
    }
  }, [quiz, id])

  useEffect(() => {
    if (isError) {
      onResponseError()
    }
  }, [isError])

  useEffect(() => {
    setMutations({ fetchEditedQuiz, fetchAddQuiz })
  }, [setMutations, fetchEditedQuiz, fetchAddQuiz])

  const onOpenCreateQuestion = () => setIsCreationOpen(true)
  const onCloseCreateQuestion = () => setIsCreationOpen(false)

  const onAddQuestions = (attachments: Question[]) => {
    setQuestions(attachments)
    handleNonInputValueChange('items', attachments)
  }

  const onOpenAddQuestionsModal = () => {
    openModal({
      component: (
        <AddResources<Question>
          columns={columns}
          onAddResources={onAddQuestions}
          removeColumnRules={removeColumnRules}
          requestService={ResourceService.getQuestionsQuery}
          resourceTab={ResourcesTabsEnum.Questions}
          resources={questions}
        />
      )
    })
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

  return isLoading ? (
    <Loader pageLoad />
  ) : (
    <PageWrapper sx={styles.container}>
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.root}
      >
        <AppTextField
          InputLabelProps={styles.titleLabel(!!data.title)}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={styles.input}
          label={data.title ? '' : t('myResourcesPage.quizzes.defaultNewTitle')}
          onChange={handleInputChange('title')}
          value={data.title}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={styles.descriptionLabel(!!data.description)}
          InputProps={styles.descriptionInput}
          fullWidth
          inputProps={styles.input}
          label={
            data.description
              ? ''
              : t('myResourcesPage.quizzes.defaultNewDescription')
          }
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
        {questions && (
          <QuestionsList
            handleNonInputValueChange={handleNonInputValueChange}
            items={questions}
            setItems={setQuestions}
          />
        )}
        {isCreationOpen && (
          <CreateOrEditQuizQuestion
            onCancel={onCloseCreateQuestion}
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
          <Button size='lg' type={ButtonTypeEnum.Submit}>
            {t('common.save')}
          </Button>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditQuizContainer
