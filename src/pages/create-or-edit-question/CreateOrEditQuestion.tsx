import { HTMLAttributes, SyntheticEvent, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'

import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import AddCategoriesModal from '~/containers/my-resources/add-categories-modal/AddCategoriesModal'
import AsyncAutocomplete from '~/components/async-autocomlete/AsyncAutocomplete'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'

import { authRoutes } from '~/router/constants/authRoutes'
import { defaultResponses, snackbarVariants } from '~/constants'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  Categories,
  CategoryNameInterface,
  ComponentEnum,
  ErrorResponse,
  CreateCategoriesParams,
  QuestionForm,
  SizeEnum,
  TextFieldVariantEnum,
  TypographyVariantEnum
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
  const { openModal, closeModal } = useModalContext()
  const [isFetched, setIsFetched] = useState<boolean>(false)

  const createQuestion = useCallback(
    (data?: QuestionForm) => ResourceService.createQuestion(data),
    []
  )

  const createCategory = useCallback(
    (params?: CreateCategoriesParams) =>
      ResourceService.createResourceCategory(params),
    []
  )

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

  const onResponse = () => {
    setAlert({
      severity: snackbarVariants.success,
      message: 'categoriesPage.newSubject.successMessage'
    })
    navigate(authRoutes.myResources.root.path)
  }

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

  const { fetchData: handleCreateCategory } = useAxios({
    service: createCategory,
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onResponseCategory,
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

  const optionsList = (
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
              optionsList(props, option.name, state.index)
            }
            service={getCategories}
            value={category}
            valueField='_id'
          />
        </Box>
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
