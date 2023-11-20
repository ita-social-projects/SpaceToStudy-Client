import { SyntheticEvent, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
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
  ErrorResponse,
  QuestionForm,
  TextFieldVariantEnum
} from '~/types'
import {
  questionType,
  sortQuestions
} from '~/components/question-editor/QuestionEditor.constants'
import { styles } from '~/pages/create-or-edit-question/CreateOrEditQuestion.styles'

const CreateOrEditQuestion = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setAlert } = useSnackBarContext()

  const createQuestion = useCallback(
    (data?: QuestionForm) => ResourceService.createQuestion(data),
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
      message: 'categoriesPage.newSubject.successMessage'
    })
    navigate(authRoutes.myResources.root.path)
  }

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.message}` : ''
    })
  }

  const { loading, fetchData } = useAxios({
    service: createQuestion,
    defaultResponse: defaultResponses.object,
    fetchOnMount: false,
    onResponse,
    onResponseError
  })

  const { data, handleInputChange, handleNonInputValueChange, handleSubmit } =
    useForm<QuestionForm>({
      initialValues: {
        type: sortQuestions[0].value,
        title: '',
        text: '',
        answers: [],
        openAnswer: '',
        category: null
      },
      onSubmit: async () => {
        await fetchData(data)
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
          category={category}
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
