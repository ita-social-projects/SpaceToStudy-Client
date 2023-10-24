import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

import { useModalContext } from '~/context/modal-context'
import { useSnackBarContext } from '~/context/snackbar-context'
import { ResourceService } from '~/services/resource-service'
import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'
import CreateOrEditQuestionModal from '~/containers/my-resources/create-or-edit-question-modal/CreateOrEditQuestionModal'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import QuestionsList from '~/containers/questions-list/QuestionsList'
import AddQuestions from '~/containers/my-resources/add-questions/AddQuestions'
import AppButton from '~/components/app-button/AppButton'
import AppTextField from '~/components/app-text-field/AppTextField'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

import { snackbarVariants } from '~/constants'
import { myResourcesPath } from '~/pages/create-or-edit-lesson/CreateOrEditLesson.constants'
import { initialValues } from '~/containers/my-quizzes/edit-quiz-container/EditQuizContainer.constants'
import { styles } from '~/containers/my-quizzes/edit-quiz-container/EditQuizContainer.styles'
import {
  ButtonTypeEnum,
  ButtonVariantEnum,
  ComponentEnum,
  Question,
  CreateQuestionData,
  CreateOrEditQuizForm,
  SizeEnum,
  TextFieldVariantEnum,
  QuestionModalForm,
  ErrorResponse
} from '~/types'
import { QuizContentProps } from '~/pages/new-quiz/NewQuiz.constants'

const EditQuizContainer = ({ questions, setQuestions }: QuizContentProps) => {
  const { t } = useTranslation()
  const { setAlert } = useSnackBarContext()
  const { openModal, closeModal } = useModalContext()
  const [isNewQuestion, setIsNewQuestion] = useState<boolean>(false)

  const createNewQuestion = useCallback(
    (data?: CreateQuestionData) => ResourceService.createQuestion(data),
    []
  )

  const onCreateResponse = useCallback(
    (response: Question | null) => {
      response && setQuestions((prev) => [...prev, response])
    },
    [setQuestions]
  )

  const onResponseError = (error: ErrorResponse) => {
    setAlert({
      severity: snackbarVariants.error,
      message: error ? `errors.${error.message}` : ''
    })
  }

  const { loading: creationLoad, fetchData: createQuestion } = useAxios({
    service: createNewQuestion,
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onCreateResponse,
    onResponseError
  })

  const {
    data,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit,
    resetData
  } = useForm<CreateOrEditQuizForm>({
    initialValues,
    onSubmit: () => console.log(data)
  })

  const {
    title,
    description,
    questionTitle,
    questionCategory,
    text,
    answers,
    type
  } = data

  const onOpenCreateQuestionModal = () => {
    openModal({
      component: (
        <CreateOrEditQuestionModal
          actions={{ onCancel: closeModal, onSave: onOpenQuestionCreation }}
          initialData={data}
        />
      )
    })
  }

  const onOpenAddQuestionsModal = () => {
    openModal({
      component: (
        <AddQuestions onAddQuestions={onAddQuestions} questions={questions} />
      )
    })
  }

  const onCloseQuestionCreation = () => setIsNewQuestion(false)

  const onOpenQuestionCreation = ({ title, category }: QuestionModalForm) => {
    handleNonInputValueChange('questionTitle', title)
    handleNonInputValueChange('questionCategory', category)
    setIsNewQuestion(true)
    closeModal()
  }

  const onCreateQuestion = async () => {
    await createQuestion({
      title: questionTitle,
      text,
      answers,
      type,
      category: questionCategory
    })

    onCloseQuestionCreation()
    resetData(['questionTitle', 'questionCategory', 'text', 'answers'])
  }

  const onAddQuestions = (attachments: Question[]) => {
    setQuestions(attachments)
  }

  return (
    <PageWrapper sx={styles.container}>
      <Box
        component={ComponentEnum.Form}
        onSubmit={handleSubmit}
        sx={styles.root}
      >
        <AppTextField
          InputLabelProps={styles.titleLabel(title)}
          InputProps={styles.titleInput}
          fullWidth
          inputProps={styles.input}
          label={t('myResourcesPage.quizzes.defaultNewTitle')}
          onChange={handleInputChange('title')}
          value={title}
          variant={TextFieldVariantEnum.Standard}
        />
        <AppTextField
          InputLabelProps={styles.descriptionLabel(description)}
          InputProps={styles.descriptionInput}
          fullWidth
          inputProps={styles.input}
          label={t('myResourcesPage.quizzes.defaultNewDescription')}
          onChange={handleInputChange('description')}
          value={description}
          variant={TextFieldVariantEnum.Standard}
        />
        <Divider sx={styles.divider} />

        <QuestionsList items={questions} setItems={setQuestions} />
        {isNewQuestion && (
          <QuestionEditor
            data={data}
            handleInputChange={handleInputChange}
            handleNonInputValueChange={handleNonInputValueChange}
            loading={creationLoad}
            onCancel={onCloseQuestionCreation}
            onSave={onCreateQuestion}
          />
        )}

        <Box sx={styles.functionalButtons}>
          <AppButton
            onClick={onOpenCreateQuestionModal}
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
          <AppButton size={SizeEnum.ExtraLarge} type={ButtonTypeEnum.Submit}>
            {t('common.save')}
          </AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default EditQuizContainer
