import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { StartViewQuizInfo } from '~/containers/quiz/quiz-info/QuizInfo'
import Button from '~scss-components/button/Button'
import QuizInfoSection from '~/containers/quiz/quiz-info-section/QuizInfoSection'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import TimeLimitReminder from '~/containers/quiz/time-limit-reminder/TimeLimitReminder'
import { authRoutes } from '~/router/constants/authRoutes'
import { getFullUrl } from '~/utils/get-full-url'

import useQuery from '~/hooks/use-query'

import { ResourceService } from '~/services/resource-service'
import styles from '~/pages/quiz-attempts/QuizAttempts.styles'
import { defaultQuizResponse } from '~/pages/quiz/Quiz.constant'

import { formatTime, getFormattedDate } from '~/utils/helper-functions'

import useQuizQuery from '~/hooks/query/use-quiz-query'
import { ONE_HOUR } from '~/constants'

const QuizAttemptsPage: React.FC = () => {
  const { id: cooperationId = '', quizId = '' } = useParams()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const { t } = useTranslation()

  const { quiz, isLoading } = useQuizQuery(quizId)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const {
    settings: { attemptLimit, timeLimit },
    description,
    title,
    items
  } = quiz ?? defaultQuizResponse

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

  if (isLoading || !quiz) {
    return <Loader pageLoad />
  }

  const handleStart = () => {
    navigate(
      getFullUrl({
        pathname: authRoutes.cooperationQuiz.route,
        parameters: { id: cooperationId, quizId }
      })
    )
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleReviewAttempt = (attemptId: string) => {
    navigate(
      getFullUrl({
        pathname: authRoutes.cooperationQuizReview.route,
        parameters: { id: cooperationId, quizId, attemptId }
      })
    )
  }

  const attemptsList =
    finishedQuizzes.length !== 0 ? (
      finishedQuizzes.map((item) => {
        return (
          <Box key={item._id} sx={styles.attemptWrapper}>
            <QuizInfoSection
              firstColumn={getFormattedDate({ date: item.updatedAt })}
              secondColumn={formatTime(item.updatedAt)}
              title={t('quiz.attemptFinished')}
            />
            <Button
              onClick={() => handleReviewAttempt(item._id)}
              variant='tonal'
            >
              {t('quiz.reviewAttempt')}
            </Button>
          </Box>
        )
      })
    ) : (
      <Box sx={styles.attemptTypographyWrapper}>
        <Typography sx={styles.typography}>
          {t('quiz.noUsedAttempts')}
        </Typography>
      </Box>
    )

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      <StartViewQuizInfo
        attempts={attemptLimit}
        onStart={openModal}
        questionsAmount={items.length}
        timeLimit={timeLimit}
        usedAttempts={finishedQuizzes.length}
      />
      <Divider sx={styles.divider} />
      {attemptsList}
      <TimeLimitReminder
        onClose={handleClose}
        onStart={handleStart}
        open={isOpen}
        timeLimit={timeLimit}
      />
    </PageWrapper>
  )
}

export default QuizAttemptsPage
