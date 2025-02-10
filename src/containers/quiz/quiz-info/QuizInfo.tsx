import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '~/design-system/components/button/Button'
import DividerComponent from '~/design-system/components/divider/Divider'
import { Alert } from '@mui/material'
import { AccessTimeRounded } from '@mui/icons-material'

import QuizInfoSection from '~/containers/quiz/quiz-info-section/QuizInfoSection'
import Timer from '~/containers/quiz/timer/Timer'
import Points from '~/containers/quiz/points/Points'
import QuizDialog from '~/containers/quiz/quiz-dialog/QuizDialog'

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
import { useState } from 'react'

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

type StartViewQuizInfoProps = {
  questionsAmount: number
  attempts: QuizAttempt
  timeLimit: QuizTimeLimit
  usedAttempts: number
  handleStartButton: (value: boolean) => void
}
const StartViewQuizInfo = ({
  questionsAmount,
  attempts,
  timeLimit,
  usedAttempts,
  handleStartButton
}: StartViewQuizInfoProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const totalAttempts = attempts.split(' ')[0]
  const timeLimitNumber = timeLimit.split(' ')[0]

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

  const handleStartAttempt = () => {
    limits.isNoLimitTime ? handleStartButton(false) : setIsOpen(true)
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

  const handleTimeLimitModal = (isOpen: boolean, isStart: boolean) => {
    setIsOpen(isOpen)
    handleStartButton(isStart)
  }

  return (
    <>
      <QuizDialog
        actionText='quiz.start'
        description='quiz.timeLimitReminderDescription'
        descriptionParams={{ timeLimit: timeLimitNumber }}
        icon={<AccessTimeRounded />}
        onAction={() => {
          handleTimeLimitModal(false, false)
        }}
        onClose={() => {
          handleTimeLimitModal(false, true)
        }}
        open={isOpen}
        title='quiz.timeLimitReminderTitle'
      />
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
            onClick={handleStartAttempt}
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

export {
  ActiveQuizInfo,
  FinishedQuizInfo,
  UngradedQuizInfo,
  GradedQuizInfo,
  StartViewQuizInfo
}
