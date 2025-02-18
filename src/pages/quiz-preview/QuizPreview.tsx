import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import { StartViewQuizInfo } from '~/containers/quiz/quiz-info/QuizInfo'
import Button from '~scss-components/button/Button'
import QuizInfoSection from '~/containers/quiz/quiz-info-section/QuizInfoSection'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import TimeLimitReminder from '~/containers/quiz/time-limit-reminder/TimeLimitReminder'

import useQuery from '~/hooks/use-query'

import { ResourceService } from '~/services/resource-service'
import styles from '~/pages/quiz-preview/QuizPreview.styles'
import { defaultQuizResponse } from '~/pages/quiz/Quiz.constant'

import { formatTime, getFormattedDate } from '~/utils/helper-functions'
import { Typography } from '@mui/material'
import useQuizQuery from '~/hooks/query-hooks/use-quiz-query'

const QuizPreviewPage = () => {
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

  const getQuizzes = useCallback(() => {
    return ResourceService.getFinishedQuizzesByQuizId(cooperationId, quizId)
  }, [cooperationId, quizId])

  const { data: finishedAttempts = [] } = useQuery({
    queryKey: ['finished-quizzes', cooperationId, quizId],
    queryFn: getQuizzes
  })

  if (isLoading || !quiz) {
    return <Loader pageLoad />
  }

  const handleStart = () => {
    navigate(`/my-cooperations/${cooperationId}/quiz/${quizId}`)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const attemptsList =
    Array.isArray(finishedAttempts) && finishedAttempts.length !== 0 ? (
      finishedAttempts.map((item) => {
        return (
          <Box key={item._id} sx={styles.attemptWrapper}>
            <QuizInfoSection
              firstColumn={getFormattedDate({ date: item.updatedAt })}
              secondColumn={formatTime(item.updatedAt)}
              title={t('quiz.attemptFinished')}
            />
            <Box>
              <Button variant='tonal'>{t('quiz.reviewAttempt')}</Button>
            </Box>
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
      <Box>
        <Box>
          <TitleWithDescription
            description={description}
            style={styles.titleWithDescription}
            title={title}
          />
          <StartViewQuizInfo
            attempts={attemptLimit}
            onStartButton={openModal}
            questionsAmount={items.length}
            timeLimit={timeLimit}
            usedAttempts={finishedAttempts.length}
          />
        </Box>
        <Divider sx={styles.divider} />
        {attemptsList}
        <TimeLimitReminder
          onClose={handleClose}
          onStart={handleStart}
          open={isOpen}
          timeLimit={timeLimit}
        />
      </Box>
    </PageWrapper>
  )
}

export default QuizPreviewPage
