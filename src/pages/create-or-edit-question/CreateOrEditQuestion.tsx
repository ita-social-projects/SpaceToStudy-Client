import { type SyntheticEvent, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import Button from '~scss-components/button/Button'
import AppTextField from '~/components/app-text-field/AppTextField'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import Loader from '~/components/loader/Loader'

import useForm from '~/hooks/use-form'
import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import { ResourceService } from '~/services/resource-service'
import { authRoutes } from '~/router/constants/authRoutes'
import { snackbarVariants } from '~/constants'
import { initialValues } from './CreateOrEditQuestion.constants'
import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { getFullUrl } from '~/utils/get-full-url'
import {
  type CategoryNameInterface,
  type CreateOrEditQuestionForm,
  type GetQuestion,
  ButtonTypeEnum,
  ComponentEnum,
  TextFieldVariantEnum
} from '~/types'
import { styles } from '~/pages/create-or-edit-question/CreateOrEditQuestion.styles'

const CreateOrEditQuestion: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { id = '' } = useParams()
  const { handleAlert, handleErrorAlert } = useSnackbarAlert()

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleNonInputValueChange('category', value?._id ?? null)
  }

  const navigateToQuestionsTab = () => {
    navigate(
      getFullUrl({
        pathname: authRoutes.myResources.root.path,
        searchParameters: { tab: 'questions' }
      })
    )
  }

  const handleResponse = () => {
    handleAlert({
      severity: snackbarVariants.success,
      message: id
        ? 'myResourcesPage.questions.successEditedQuestion'
        : 'myResourcesPage.questions.successAddedQuestion'
    })
    navigateToQuestionsTab()
  }

  const handleSubmitQuestion = () => {
    if (id) {
      editQuestion({ ...data, id: id })
    } else {
      createQuestion(data)
    }
  }

  const { mutate: createQuestion, isPending: createQuestionPending } =
    useMutation({
      queryKey: ['questions'],
      mutationFn: ResourceService.createQuestion,
      onSuccess: handleResponse,
      onError: handleErrorAlert
    })

  const { mutate: editQuestion, isPending: updateQuestionPending } =
    useMutation({
      queryKeys: [['questions'], ['question', id]],
      mutationFn: ResourceService.updateQuestion,
      onSuccess: handleResponse,
      onError: handleErrorAlert
    })

  const getQuestion = useCallback(() => {
    return ResourceService.getQuestion(id)
  }, [id])

  const {
    data: question,
    isLoading: questionLoading,
    error: questionError
  } = useQuery({
    queryKey: ['question', id],
    queryFn: getQuestion,
    options: {
      staleTime: Infinity
    }
  })

  const {
    data,
    handleDataChange,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit,
    handleErrors,
    errors
  } = useForm<CreateOrEditQuestionForm>({
    initialValues: initialValues,
    onSubmit: handleSubmitQuestion
  })

  const { type, title, text, answers, openAnswer, category } = data
  const { isOpenAnswer } = determineQuestionType(type)

  const isButtonsVisible = isOpenAnswer
    ? Boolean(title && text && openAnswer)
    : Boolean(title && text && answers[0]?.text)

  const buttons = (
    <Box sx={styles.buttons}>
      <Button onClick={navigateToQuestionsTab} variant='tonal'>
        {t('common.cancel')}
      </Button>
      <Button
        disabled={!isButtonsVisible}
        loading={createQuestionPending || updateQuestionPending}
        type={ButtonTypeEnum.Submit}
      >
        {t('common.save')}
      </Button>
    </Box>
  )

  useEffect(() => {
    if (question) {
      handleDataChange<GetQuestion>(question)
    }
  }, [question, handleDataChange])

  useEffect(() => {
    if (questionError) {
      handleErrorAlert(questionError)
    }
  }, [questionError, handleErrorAlert])

  if (questionLoading || !question) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper>
      <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
        <AppTextField
          InputLabelProps={styles.titleLabel(title)}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={styles.input}
          label={t('questionPage.untitled')}
          onChange={handleInputChange('title')}
          value={title}
          variant={TextFieldVariantEnum.Standard}
        />
        <CategoryDropdown
          category={category ?? null}
          onCategoryChange={onCategoryChange}
        />
        <Divider sx={styles.mainDivider} />
        <QuestionEditor
          data={data}
          errors={errors}
          handleErrors={handleErrors}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
        />
        {buttons}
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditQuestion
