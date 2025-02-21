import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '~/design-system/components/button/Button'
import DividerComponent from '~/design-system/components/divider/Divider'
import { Alert } from '@mui/material'

import QuizInfoSection from '~/containers/quiz/quiz-info-section/QuizInfoSection'
import Timer from '~/containers/quiz/timer/Timer'
import Points from '~/containers/quiz/points/Points'

import styles from '~/containers/quiz/quiz-info/QuizInfo.styles'
import {
  getFormattedDate,
  formatTime,
  formatTimeDifference,
  spliceSx
} from '~/utils/helper-functions'

import { QuizAttempt, QuizTimeLimit } from '~/types'
import { getQuizTimeLimitFields } from '~/containers/my-quizzes/quiz-settings-container/QuizSettingsContainer.constants'
import { TFunction } from 'i18next'

type ActiveQuizInfoProps = {
  questionsAnswered: number
  totalPoints: number
}

const ActiveQuizInfo: React.FC<ActiveQuizInfoProps> = ({
  questionsAnswered,
  totalPoints
}) => {
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

const FinishedQuizInfo: React.FC<FinishedQuizInfoProps> = ({
  points,
  totalPoints,
  createdAt,
  updatedAt
}) => {
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

type TutorQuizInfoProps = {
  points: number
  totalPoints: number
}

const TutorQuizInfo: React.FC<TutorQuizInfoProps> = ({
  points,
  totalPoints
}) => {
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

type StartViewQuizInfoProps = {
  questionsAmount: number
  attempts: QuizAttempt
  timeLimit: QuizTimeLimit
  usedAttempts: number
  onStart: () => void
}

const StartViewQuizInfo: React.FC<StartViewQuizInfoProps> = ({
  questionsAmount,
  attempts,
  timeLimit,
  usedAttempts,
  onStart
}) => {
  const { t } = useTranslation()

  const [totalAttempts] = attempts.split(' ')

  const limits = {
    isNoLimitAttempt: attempts === QuizAttempt.NoLimit,
    isNoLimitTime: timeLimit === QuizTimeLimit.NoLimit,
    maxAttempts: Number(totalAttempts) || 0
  }

  const hasAttempts =
    limits.isNoLimitAttempt || usedAttempts < limits.maxAttempts

  const typographyStyle = (subType: number) => {
    return spliceSx(
      styles[`subtitle${subType}` as keyof typeof styles],
      styles.subtitleSize
    )
  }

  const getQuizTimeLimitTitle = (t: TFunction, timeLimit: QuizTimeLimit) => {
    const timeOption = getQuizTimeLimitFields(t).find(
      (option) => option.value === timeLimit
    )
    return timeOption?.title ?? ''
  }

  const attemptLimitOutput = !limits.isNoLimitAttempt && (
    <>
      <Box sx={styles.dividerEllipse}>
        <DividerComponent
          caption=''
          orientation='horizontal'
          size='small'
          textAlign='center'
          thickness='md'
          type='ellipse'
          variant='middle'
        />
      </Box>
      <Typography sx={typographyStyle(1)}>{t('quiz.attemptLimit')}:</Typography>
      <Typography sx={typographyStyle(2)}>
        {usedAttempts}/{totalAttempts}
      </Typography>
    </>
  )

  const timeLimitOutput = !limits.isNoLimitTime && (
    <>
      <Box sx={styles.dividerEllipse}>
        <DividerComponent
          caption=''
          orientation='horizontal'
          size='small'
          textAlign='right'
          thickness='md'
          type='ellipse'
          variant='inset'
        />
      </Box>
      <Typography sx={typographyStyle(1)}>{t('quiz.timeLimit')}:</Typography>
      <Typography sx={typographyStyle(2)}>
        {getQuizTimeLimitTitle(t, timeLimit)}
      </Typography>
    </>
  )

  const noAttemptsAlert = !hasAttempts && (
    <Alert severity='info'>{t('quiz.reachedAttemptLimit')}</Alert>
  )

  return (
    <>
      <Box sx={styles.infoWrapper}>
        <Box sx={styles.quizSettings}>
          <Typography sx={typographyStyle(1)}>
            {t('quiz.questionsAmount')}:
          </Typography>
          <Typography sx={typographyStyle(2)}>{questionsAmount}</Typography>
          {attemptLimitOutput}
          {timeLimitOutput}
        </Box>
        <Box sx={styles.buttonWrapper}>
          <Button
            data-testid='startButton'
            disabled={!hasAttempts}
            onClick={onStart}
            size='sm'
          >
            {usedAttempts === 0 ? t('quiz.startQuiz') : t('quiz.tryAgain')}
          </Button>
        </Box>
      </Box>
      {noAttemptsAlert}
    </>
  )
}

export { ActiveQuizInfo, FinishedQuizInfo, TutorQuizInfo, StartViewQuizInfo }
