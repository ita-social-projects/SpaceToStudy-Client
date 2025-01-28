import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '~/design-system/components/button/Button'

import QuizInfoSection from '~/containers/quiz/quiz-info-section/QuizInfoSection'
import Timer from '~/containers/quiz/timer/Timer'
import Points from '~/containers/quiz/points/Points'

import styles from '~/containers/quiz/quiz-info/QuizInfo.styles'
import {
  getFormattedDate,
  formatTime,
  formatTimeDifference
} from '~/utils/helper-functions'

type ActiveQuizInfoProps = {
  questionsAnswered: number
  totalPoints: number
}

const ActiveQuizInfo = ({
  questionsAnswered,
  totalPoints
}: ActiveQuizInfoProps) => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        ...styles.infoWrapper,
        gap: '24px'
      }}
    >
      <Timer isTimeEnds={false} label='00:19:59' />
      <Divider
        flexItem
        orientation='vertical'
        sx={styles.smallDivider}
        variant='middle'
      />
      <Box sx={styles.questionsAnsweredWrapper}>
        <Typography sx={styles.subtitle1}>
          {t('quiz.questionsAnswered')}:
        </Typography>
        <Typography sx={styles.subtitle2}>
          {questionsAnswered}/{totalPoints}
        </Typography>
      </Box>
    </Box>
  )
}

type FinishedQuizInfoProps = {
  points: number
  totalPoints: number
  createdAt: string
  updatedAt: string
}

const FinishedQuizInfo = ({
  points,
  totalPoints,
  createdAt,
  updatedAt
}: FinishedQuizInfoProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.infoWrapper}>
      <QuizInfoSection
        firstColumn={getFormattedDate({ date: updatedAt })}
        secondColumn={formatTime(updatedAt)}
        title={t('quiz.attemptFinished')}
      />
      <Divider
        flexItem
        orientation='vertical'
        sx={styles.divider}
        variant='middle'
      />
      <QuizInfoSection
        firstColumn={`${formatTime(createdAt)} - ${formatTime(updatedAt)}`}
        secondColumn={`${formatTimeDifference(updatedAt, createdAt) + ' ' + t('quiz.min')}`}
        title={t('quiz.duration')}
      />
      <Divider
        flexItem
        orientation='vertical'
        sx={styles.divider}
        variant='middle'
      />
      <QuizInfoSection
        firstColumn={`${points}/${totalPoints}`}
        title={t('quiz.points')}
      />
    </Box>
  )
}

const UngradedQuizInfo = () => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.infoWrapper}>
      <QuizInfoSection
        firstColumn='May 17, 2024'
        secondColumn='14:15'
        title={t('quiz.attemptFinished')}
      />
      <Divider
        flexItem
        orientation='vertical'
        sx={styles.divider}
        variant='middle'
      />
      <QuizInfoSection
        firstColumn='13:50 - 14:15'
        secondColumn='25 min'
        title={t('quiz.duration')}
      />
      <Divider
        flexItem
        orientation='vertical'
        sx={styles.divider}
        variant='middle'
      />
      <QuizInfoSection firstColumn='-' title={t('quiz.points')} />
      <Box sx={styles.buttonWrapper}>
        <Button size='sm' variant='tonal'>
          {t('quiz.evaluate')}
        </Button>
      </Box>
    </Box>
  )
}

type GradedQuizInfoProps = {
  points: number
  totalPoints: number
}

const GradedQuizInfo = ({ points, totalPoints }: GradedQuizInfoProps) => {
  const { t } = useTranslation()

  return (
    <Box sx={styles.infoWrapper}>
      <Points
        points={points ?? 0}
        title={t('quiz.points')}
        totalPoints={totalPoints}
      />
      <Box sx={styles.buttonWrapper}>
        <Button size='sm'>{t('quiz.save')}</Button>
      </Box>
    </Box>
  )
}

export { ActiveQuizInfo, FinishedQuizInfo, UngradedQuizInfo, GradedQuizInfo }
