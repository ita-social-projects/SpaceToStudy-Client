import { Box, IconButton, Stack } from '@mui/material'
import { useTranslation } from 'react-i18next'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '~/containers/quiz/quiz-question/Question.styles'
import { useCallback, useEffect, useState } from 'react'
import { ResourceService } from '~/services/resource-service'
import { useParams } from 'react-router-dom'
import useQuery from '~/hooks/use-query'
import { ONE_HOUR, snackbarVariants } from '~/constants'
import useMutation from '~/hooks/use-mutation'
import { type ErrorResponse } from '~/types'
import { useAppDispatch } from '~/hooks/use-redux'
import { openAlert } from '~/redux/features/snackbarSlice'
import { getErrorKey } from '~/utils/get-error-key'

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
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
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
      if (currentQuiz) {
        const questionResult = currentQuiz.results.find(
          (result) => result.question === questionText
        )
        if (questionResult && questionResult.answers.length > 0) {
          const currentIsCorrect = questionResult.answers[0].isCorrect
          setIsCorrect(currentIsCorrect)
          onUpdate?.(currentIsCorrect)
        }
      }
    }
  }, [finishedQuizzes, attemptId, questionText, isLoading, onUpdate])

  const handleGradeUpdate = useCallback(
    (newIsCorrect: boolean) => {
      const finishedQuiz = finishedQuizzes.find(
        (quiz) => quiz._id === attemptId
      )

      if (!finishedQuiz) {
        return
      }

      const updatedResults = finishedQuiz.results.map((result) =>
        result.question === questionText
          ? {
              ...result,
              answers: result.answers.map((answer) => ({
                ...answer,
                isCorrect: newIsCorrect,
                isChosen: true
              }))
            }
          : result
      )

      const totalQuestions = updatedResults.length
      const correctAnswers = updatedResults.reduce((total, result) => {
        const isCorrect = result.answers.some((answer) => answer.isCorrect)
        return total + (isCorrect ? 1 : 0)
      }, 0)
      const newGrade = Math.round((correctAnswers / totalQuestions) * 100)

      onUpdate?.(isCorrect)

      return {
        ...finishedQuiz,
        results: updatedResults,
        grade: newGrade
      }
    },
    [finishedQuizzes, onUpdate, isCorrect, attemptId, questionText]
  )

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

  const handleUpdateGrade = useCallback(
    async (newIsCorrect: boolean) => {
      const updatedQuiz = handleGradeUpdate(newIsCorrect)
      if (!updatedQuiz) {
        throw new Error(t('errorMessages.quizNotFoundToUpdate'))
      }
      return ResourceService.editFinishedQuiz(attemptId, updatedQuiz)
    },
    [handleGradeUpdate, attemptId, t]
  )

  const { mutate: updateAttempt } = useMutation({
    mutationFn: handleUpdateGrade,
    onError: onResponseError,
    onSuccess: onResponseSuccess,
    queryKey: ['finished-quizzes', attemptId]
  })

  const handleCorrectAnswer = (newIsCorrect: boolean) => {
    setIsCorrect(newIsCorrect)
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
