import { Box, IconButton, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '~/containers/quiz/quiz-question/Question.styles'
import { useCallback, useEffect } from 'react'
import { ResourceService } from '~/services/resource-service'
import { useParams } from 'react-router-dom'
import useQuery from '~/hooks/use-query'
import { ONE_HOUR, snackbarVariants } from '~/constants'
import useMutation from '~/hooks/use-mutation'
import { type ErrorResponse } from '~/types'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'
import { QuizErrors } from './Question.constants'

interface TutorAnswerGradingProps {
  questionText?: string
  onUpdate?: (isCorrect: boolean) => void
}

const TutorAnswerGrading: React.FC<TutorAnswerGradingProps> = ({
  questionText,
  onUpdate
}) => {
  const { t } = useTranslation()
  const { id: cooperationId = '', quizId = '', attemptId = '' } = useParams()
  const dispatch = useAppDispatch()

  const getFinishedQuizzes = useCallback(() => {
    return ResourceService.getFinishedQuizzesByQuizId(cooperationId, quizId)
  }, [cooperationId, quizId])

  const { data: finishedQuizzes = [], isLoading } = useQuery({
    queryKey: ['finished-quizzes', cooperationId, quizId],
    queryFn: getFinishedQuizzes,
    options: {
      staleTime: ONE_HOUR
    }
  })

  useEffect(() => {
    if (!isLoading && finishedQuizzes.length > 0 && questionText) {
      const currentQuiz = finishedQuizzes.find((quiz) => quiz._id === attemptId)
      if (!currentQuiz) {
        return
      }
      const questionResult = currentQuiz.results.find(
        (result) => result.question === questionText
      )
      if (!questionResult) {
        return
      }

      if (questionResult.answers.length === 0) {
        onUpdate?.(false)
        return
      }
      const currentIsCorrect = questionResult.answers[0].isCorrect
      onUpdate?.(currentIsCorrect)
    }
  }, [finishedQuizzes, attemptId, questionText, isLoading, onUpdate])

  const onResponseError = (error?: ErrorResponse) => {
    dispatch(
      openAlert({
        severity: snackbarVariants.error,
        message: getErrorKey(error)
      })
    )
  }

  const onResponseSuccess = () => {
    dispatch(
      openAlert({
        severity: snackbarVariants.success,
        message: t('quiz.answerUpdatedSuccessfully')
      })
    )
  }

  const updateFinishedQuizAttempt = async (
    attemptId: string,
    questionText?: string,
    newIsCorrect?: boolean
  ) => {
    if (!attemptId || !questionText || newIsCorrect === undefined) {
      throw QuizErrors.QUIZ_NOT_FOUND_TO_UPDATE
    }

    return ResourceService.editFinishedQuiz(attemptId, {
      questionText,
      newIsCorrect
    })
  }

  const { mutate: updateAttempt } = useMutation({
    mutationFn: (newIsCorrect: boolean) =>
      updateFinishedQuizAttempt(attemptId, questionText, newIsCorrect),
    onError: onResponseError,
    onSuccess: onResponseSuccess,
    queryKeys: [
      ['finished-quizzes', cooperationId, quizId],
      ['finished-quizzes', attemptId]
    ]
  })

  const handleCorrectAnswer = (newIsCorrect: boolean) => {
    onUpdate?.(newIsCorrect)
    updateAttempt(newIsCorrect)
  }

  return (
    <Box>
      <Stack direction='row' spacing={1}>
        <IconButton color='success' onClick={() => handleCorrectAnswer(true)}>
          <CheckIcon sx={styles.check} />
        </IconButton>
        <IconButton color='error' onClick={() => handleCorrectAnswer(false)}>
          <CloseIcon sx={styles.cross} />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default TutorAnswerGrading
