import { SyntheticEvent, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AxiosResponse } from 'axios'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import CategoryDropdown from '~/containers/category-dropdown/CategoryDropdown'
import Loader from '~/components/loader/Loader'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import { useSnackBarContext } from '~/context/snackbar-context'
import { authRoutes } from '~/router/constants/authRoutes'
import { getErrorMessage } from '~/utils/error-with-message'
import { defaultResponses, snackbarVariants } from '~/constants'
import {
  initialValues,
  defaultResponse
} from './CreateOrEditQuestion.constants'
import { questionType } from '~/components/question-editor/QuestionEditor.constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  CategoryNameInterface,
  ComponentEnum,
  CreateOrEditQuestionForm,
  ErrorResponse,
  GetQuestion,
  TextFieldVariantEnum,
  UpdateQuestionParams
} from '~/types'
import { styles } from '~/pages/create-or-edit-question/CreateOrEditQuestion.styles'

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
      message: error
        ? t(`errors.${error.code}`, {
            message: getErrorMessage(error.message)
          })
        : ''
    })
  }

  const { loading: createQuestionLoading, fetchData: handleCreateQuestion } =
    useAxios({
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

  const { loading: editQuestionLoading, fetchData: handleEditQuestion } =
    useAxios<null, UpdateQuestionParams>({
      service: editQuestion,
      fetchOnMount: false,
      defaultResponse: null,
      onResponse,
      onResponseError
    })

  const getQuestion = (id?: string): Promise<AxiosResponse<GetQuestion>> => {
    return ResourceService.getQuestion(id)
  }

  const {
    loading: getQuestionLoading,
    fetchData: handleGetQuestion,
    response: question
  } = useAxios<GetQuestion, string>({
    service: getQuestion,
    fetchOnMount: false,
    defaultResponse
  })

  const {
    data,
    handleDataChange,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit
  } = useForm<CreateOrEditQuestionForm>({
    initialValues: initialValues,
    onSubmit: async () => {
      id
        ? await handleEditQuestion({ ...data, id })
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
        loading={createQuestionLoading || editQuestionLoading}
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

  useEffect(() => {
    if (question) {
      handleDataChange<GetQuestion>(question)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  if (getQuestionLoading) {
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
          handleInputChange={handleInputChange}
          handleNonInputValueChange={handleNonInputValueChange}
        />
        {buttons}
      </Box>
    </PageWrapper>
  )
}

export default CreateOrEditQuestion
