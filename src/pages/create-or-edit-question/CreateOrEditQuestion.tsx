import { SyntheticEvent, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { authRoutes } from '~/router/constants/authRoutes'
import { defaultResponses, snackbarVariants } from '~/constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  CategoryNameInterface,
  ComponentEnum,
  CreateOrEditQuestionForm,
  ErrorResponse,
  QuestionTypesEnum,
  TextFieldVariantEnum,
  UpdateQuestionParams
} from '~/types'
import {
  questionType,
  sortQuestions
} from '~/components/question-editor/QuestionEditor.constants'
import { styles } from '~/pages/create-or-edit-question/CreateOrEditQuestion.styles'
import { AxiosResponse } from 'axios'

const CreateOrEditQuestion = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setAlert } = useSnackBarContext()
  const { id } = useParams()

  const createQuestion = useCallback(
    (data?: CreateOrEditQuestionForm) => ResourceService.createQuestion(data),
    []
  )

  const onCategoryChange = (
    _: SyntheticEvent,
    value: CategoryNameInterface | null
  ) => {
    handleNonInputValueChange('category', value?._id ?? null)
    console.log(value?._id)
  }

  const onResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: id
        ? t('myResourcesPage.questions.successEditedQuestion')
        : t('myResourcesPage.questions.successAddedQuestion')
    })
    navigate(authRoutes.myResources.root.path)
  }

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.message}` : ''
    })
  }

  const { loading, fetchData: handleCreateQuestion } = useAxios({
    service: createQuestion,
    defaultResponse: defaultResponses.object,
    fetchOnMount: false,
    onResponse,
    onResponseError
  })

  const editQuestion = useCallback(
    (params?: UpdateQuestionParams) => ResourceService.updateQuestion(params),
    []
  )

  const { fetchData: handleEditQuestion } = useAxios<
    null,
    UpdateQuestionParams
  >({
    service: editQuestion,
    fetchOnMount: false,
    defaultResponse: null,
    onResponse,
    onResponseError
  })

  const getQuestion = (id?: string): Promise<AxiosResponse> => {
    return ResourceService.getQuestion(id)
  }

  const onResponseQuestion = (question: CreateOrEditQuestionForm) => {
    for (const key in data) {
      const validKey = key as keyof CreateOrEditQuestionForm
      handleNonInputValueChange(validKey, question[validKey])
    }
  }

  const { fetchData: handleGetQuestion } = useAxios({
    service: getQuestion,
    fetchOnMount: false,
    defaultResponse: {
      category: null,
      answers: [],
      openAnswer: ' ',
      title: ' ',
      text: ' ',
      type: QuestionTypesEnum.MultipleChoice
    },
    onResponse: onResponseQuestion,
    onResponseError
  })

  const { data, handleInputChange, handleNonInputValueChange, handleSubmit } =
    useForm<CreateOrEditQuestionForm>({
      initialValues: {
        type: sortQuestions[0].value,
        title: '',
        text: '',
        answers: [],
        openAnswer: '',
        category: null
      },
      onSubmit: async () => {
        id
          ? await handleEditQuestion({ ...data, id: id })
          : await handleCreateQuestion(data)
      }
    })

  const { type, title, text, answers, openAnswer, category } = data
  const { isOpenAnswer } = questionType(type)

  const isButtonsVisible = isOpenAnswer
    ? Boolean(title && text && openAnswer)
    : Boolean(title && text && answers[0]?.text)

  const buttons = (
    <Box sx={styles.buttons}>
      <AppButton
        onClick={() => navigate(authRoutes.myResources.root.path)}
        variant={ButtonVariantEnum.Tonal}
      >
        {t('common.cancel')}
      </AppButton>
      <AppButton
        disabled={!isButtonsVisible}
        loading={loading}
        type={ButtonTypeEnum.Submit}
      >
        {t('common.save')}
      </AppButton>
    </Box>
  )

  useEffect(() => {
    if (id) {
      void handleGetQuestion(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
          category={category ? category._id : null}
          onCategoryChange={onCategoryChange}
        />
        <Divider sx={styles.mainDivider} />
        <QuestionEditor
          data={data}
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
        />
        {buttons}
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditQuestion
