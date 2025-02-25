import { useImperativeHandle, forwardRef, useCallback } from 'react'
import Box from '@mui/material/Box'

import { useModalContext } from '~/context/modal-context'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import { ResourceService } from '~/services/resource-service'
import useForm from '~/hooks/use-form'
import useMutation from '~/hooks/use-mutation'
import QuestionEditor from '~/components/question-editor/QuestionEditor'
import CreateOrEditQuestionModal from '~/containers/my-resources/create-or-edit-question-modal/CreateOrEditQuestionModal'

import { snackbarVariants } from '~/constants'
import {
  ComponentEnum,
  type Question,
  type QuestionForm,
  type QuestionModalForm
} from '~/types'
import { initialValues } from '~/containers/my-quizzes/create-or-edit-quiz-question/CreateOrEditQuizQuestion.constants'

interface CreateOrEditQuizQuestionProps {
  question?: Question
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
  onCancel: () => void
}

const CreateOrEditQuizQuestion = forwardRef<
  { openCreateModal: () => void },
  CreateOrEditQuizQuestionProps
>(({ question, setQuestions, onCancel }, reference) => {
  const { handleErrorAlert, handleAlert } = useSnackbarAlert()
  const { openModal, closeModal } = useModalContext()

  const handleCreateResponse = (createdQuestion: Question) => {
    if (createdQuestion) {
      setQuestions((prevQuestions) => [...prevQuestions, createdQuestion])
    }
    handleResponse()
  }

  const handleUpdateResponse = (updatedQuestion: Question) => {
    if (updatedQuestion) {
      setQuestions((prevQuestions) => {
        return prevQuestions.map((question) =>
          question._id === updatedQuestion._id ? updatedQuestion : question
        )
      })
    }
    handleResponse()
  }

  const handleResponse = () => {
    handleAlert({
      severity: snackbarVariants.success,
      message: 'myResourcesPage.questions.successAddedQuestion'
    })
    onCancel()
  }

  const { mutate: createQuestion, isPending: createPending } = useMutation({
    queryKey: ['questions'],
    mutationFn: ResourceService.createQuestion,
    onSuccess: handleCreateResponse,
    onError: handleErrorAlert
  })

  const { mutate: updateQuestion, isPending: updatePending } = useMutation({
    queryKeys: [['questions'], ['question', question?._id]],
    mutationFn: ResourceService.updateQuestion,
    onSuccess: handleUpdateResponse,
    onError: handleErrorAlert
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
  const handleCloseCreation = useCallback(() => {
    closeModal()
    onCancel()
  }, [closeModal, onCancel])

  const handleOpenCreation = useCallback(
    ({ title, category }: QuestionModalForm) => {
      handleNonInputValueChange('title', title)
      handleNonInputValueChange('category', category)
      closeModal()
    },
    [closeModal, handleNonInputValueChange]
  )

  const handleCreateQuestion = () => {
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

    createQuestion(updatedData)
  }

  const handleUpdateQuestion = () => {
    if (question) {
      updateQuestion({ ...data, id: question._id })
    }
  }

  const handleOpenCreateQuestionModal = useCallback(() => {
    openModal({
      component: (
        <CreateOrEditQuestionModal
          actions={{
            onCancel: handleCloseCreation,
            onSave: handleOpenCreation
          }}
          initialData={data}
        />
      ),
      customCloseModal: onCancel
    })
  }, [openModal, handleCloseCreation, handleOpenCreation, data, onCancel])

  useImperativeHandle(reference, () => ({
    openCreateModal: handleOpenCreateQuestionModal
  }))

  return (
    <Box component={ComponentEnum.Form} onSubmit={handleSubmit}>
      <QuestionEditor
        data={data}
        errors={errors}
        handleErrors={handleErrors}
        handleInputChange={handleInputChange}
        handleNonInputValueChange={handleNonInputValueChange}
        isQuizQuestion
        loading={createPending || updatePending}
        onCancel={onCancel}
        onEdit={handleOpenCreateQuestionModal}
        onSave={question ? handleUpdateQuestion : handleCreateQuestion}
      />
    </Box>
  )
})

CreateOrEditQuizQuestion.displayName = 'CreateOrEditQuizQuestion'

export default CreateOrEditQuizQuestion
