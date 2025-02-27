import { Box, IconButton, Stack } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import { styles } from '~/containers/quiz/quiz-question/Question.styles'
import { useCallback } from 'react'
import { ResourceService } from '~/services/resource-service'
import { useParams } from 'react-router-dom'
import useQuery from '~/hooks/use-query'
import { ONE_HOUR } from '~/constants'

interface TutorAnswerGradingProps {
  finishedQuizId: string
  questionText: string
  onUpdate: (updatedGrade: number) => void
}

const TutorAnswerGrading: React.FC<TutorAnswerGradingProps> = ({
  finishedQuizId,
  questionText,
  onUpdate
}) => {
  const { id: cooperationId = '', quizId = '', attemptId = '' } = useParams()

  const getFinishedQuizzes = useCallback(() => {
    return ResourceService.getFinishedQuizzesByQuizId(cooperationId, quizId)
  }, [cooperationId, quizId])

  const { data: finishedQuizzes = [] } = useQuery({
    queryKey: ['finished-quizzes', cooperationId, quizId],
    queryFn: getFinishedQuizzes,
    options: {
      staleTime: ONE_HOUR
    }
  })

  const handleGradeUpdate = (isCorrect: boolean) => {
    const finishedQuiz = finishedQuizzes.find((quiz) => quiz._id === attemptId)

    if (!finishedQuiz) {
      return
    }

    const updatedResults = finishedQuiz.results.map((result) =>
      result.question === questionText
        ? {
            ...result,
            answers: result.answers.map((answer) => ({
              ...answer,
              isCorrect,
              isChosen: isCorrect
            }))
          }
        : result
    )

    console.log(updatedResults)
  }

  return (
    <Box>
      <Stack direction='row' spacing={1}>
        <IconButton color='success' onClick={() => handleGradeUpdate(true)}>
          <CheckIcon sx={styles.check} />
        </IconButton>
        <IconButton color='error' onClick={() => handleGradeUpdate(false)}>
          <CloseIcon sx={styles.cross} />
        </IconButton>
      </Stack>
    </Box>
  )
}

export default TutorAnswerGrading
