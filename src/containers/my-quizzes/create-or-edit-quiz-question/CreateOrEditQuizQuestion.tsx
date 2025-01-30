import React from 'react'
import Box from '@mui/material/Box'

import { useModalContext } from '~/context/modal-context'
import { ResourceService } from '~/services/resource-service'
import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import CreateOrEditQuestionModal from '~/containers/my-resources/create-or-edit-question-modal/CreateOrEditQuestionModal'

import { getErrorMessage } from '~/utils/error-with-message'
import { snackbarVariants } from '~/constants'
import {
  ComponentEnum,
  ErrorResponse,
  Question,
  QuestionForm,
  QuestionModalForm,
  UpdateQuestionParams
} from '~/types'
import { initialValues } from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion.constants'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

interface CreateOrEditQuizQuestionProps {
  question?: Question
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
  onCancel: () => void
}

const CreateOrEditQuizQuestion: React.FC<CreateOrEditQuizQuestionProps> = ({
  question,
  setQuestions,
  onCancel
}) => {
  const dispatch = useAppDispatch()
  const [isNewQuestion, setIsNewQuestion] = React.useState<boolean>(!!question)
  const { openModal, closeModal } = useModalContext()

  const createQuestionService = React.useCallback(
    (data?: QuestionForm) => ResourceService.createQuestion(data),
    []
  )

  const updateQuestionService = React.useCallback(
    (params?: UpdateQuestionParams) => ResourceService.updateQuestion(params),
    []
  )

  const onCreateResponse = (response: Question | null) => {
    response && setQuestions((prev) => [...prev, response])
    onResponse()
  }

  const onUpdateResponse = (response: Question | null) => {
    response &&
      setQuestions((prev) =>
        prev.map((item) => (item._id === response._id ? response : item))
      )
    onResponse()
  }

  const onResponse = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: 'myResourcesPage.questions.successAddedQuestion'
      })
    )
    onCancel()
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

  const { loading: createLoading, fetchData: createQuestion } = useAxios({
    service: createQuestionService,
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onCreateResponse,
    onResponseError
  })

  const { loading: updateLoading, fetchData: updateQuestion } = useAxios({
    service: updateQuestionService,
    defaultResponse: null,
    fetchOnMount: false,
    onResponse: onUpdateResponse,
    onResponseError
  })

  const {
    data,
    handleInputChange,
    handleNonInputValueChange,
    handleSubmit,
    handleErrors,
    errors
  } = useForm<QuestionForm>({
    initialValues: initialValues(question)
  })
  const onCloseCreation = () => {
    closeModal()
    onCancel()
  }

  const onOpenCreation = ({ title, category }: QuestionModalForm) => {
    handleNonInputValueChange('title', title)
    handleNonInputValueChange('category', category)
    setIsNewQuestion(true)
    closeModal()
  }

  const onCreateQuestion = async () => {
    const updatedData = data.openAnswer
      ? {
          ...data,
          answers: [
            ...data.answers,
            { text: data.openAnswer, isCorrect: true, id: data.answers.length }
          ],
          openAnswer: ''
        }
      : data

    await createQuestion(updatedData)
  }

  const onUpdateQuestion = async () => {
    question && (await updateQuestion({ ...data, id: question._id }))
  }

  const onOpenCreateQuestionModal = () => {
    openModal({
      component: (
        <CreateOrEditQuestionModal
          actions={{ onCancel: onCloseCreation, onSave: onOpenCreation }}
          initialData={data}
        />
      ),
      customCloseModal: onCancel
    })
  }

  React.useEffect(() => {
    !question && onOpenCreateQuestionModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question])

  return isNewQuestion ? (
    <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
      <QuestionEditor
        data={data}
        errors={errors}
        handleErrors={handleErrors}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        isQuizQuestion
        loading={createLoading || updateLoading}
        onCancel={onCancel}
        onEdit={onOpenCreateQuestionModal}
        onSave={question ? onUpdateQuestion : onCreateQuestion}
      />
    </Box>
  ) : null
}

export default CreateOrEditQuizQuestion
