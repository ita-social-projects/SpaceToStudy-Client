import { useImperativeHandle, forwardRef } from 'react'
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
import { useCallback } from 'react'

interface CreateOrEditQuizQuestionProps {
  question?: Question
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>
  onCancel: () => void
}

export interface CreateOrEditQuizQuestionRef {
  openCreateModal: () => void
}

const CreateOrEditQuizQuestionComponent = (
  { question, setQuestions, onCancel }: CreateOrEditQuizQuestionProps,
  ref: React.Ref<CreateOrEditQuizQuestionRef>
) => {
  const { handleErrorAlert, handleAlert } = useSnackbarAlert()
  const { openModal, closeModal } = useModalContext()

  const onCreateResponse = (createdQuestion: Question | null) => {
    createdQuestion &&
      setQuestions((prevQuestions) => [...prevQuestions, createdQuestion])
    onResponse()
  }

  const onUpdateResponse = (updatedQuestion: Question | null) => {
    updatedQuestion &&
      setQuestions((prevQuestions) =>
        prevQuestions.map((question) =>
          question._id === updatedQuestion._id ? updatedQuestion : question
        )
      )
    onResponse()
  }

  const onResponse = () => {
    handleAlert({
      severity: snackbarVariants.success,
      message: 'myResourcesPage.questions.successAddedQuestion'
    })
    onCancel()
  }

  const { mutate: createQuestion, isPending: createPending } = useMutation({
    mutationFn: ResourceService.createQuestionQuery,
    onSuccess: onCreateResponse,
    onError: handleErrorAlert
  })

  const { mutate: updateQuestion, isPending: updatePending } = useMutation({
    mutationFn: ResourceService.updateQuestionQuery,
    onSuccess: onUpdateResponse,
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
  const onCloseCreation = useCallback(() => {
    closeModal()
    onCancel()
  }, [closeModal, onCancel])

  const onOpenCreation = useCallback(
    ({ title, category }: QuestionModalForm) => {
      handleNonInputValueChange('title', title)
      handleNonInputValueChange('category', category)
      closeModal()
    },
    [closeModal, handleNonInputValueChange]
  )

  const onCreateQuestion = () => {
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

  const onUpdateQuestion = () => {
    question && updateQuestion({ ...data, id: question._id })
  }

  const onOpenCreateQuestionModal = useCallback(() => {
    openModal({
      component: (
        <CreateOrEditQuestionModal
          actions={{ onCancel: onCloseCreation, onSave: onOpenCreation }}
          initialData={data}
        />
      ),
      customCloseModal: onCancel
    })
  }, [openModal, onCloseCreation, onOpenCreation, data, onCancel])

  useImperativeHandle(ref, () => ({
    openCreateModal: onOpenCreateQuestionModal
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
        onEdit={onOpenCreateQuestionModal}
        onSave={question ? onUpdateQuestion : onCreateQuestion}
      />
    </Box>
  )
}

const CreateOrEditQuizQuestion = forwardRef(CreateOrEditQuizQuestionComponent)

export default CreateOrEditQuizQuestion
