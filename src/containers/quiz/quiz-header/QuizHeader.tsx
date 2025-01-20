import { useTranslation } from 'react-i18next'
import { useAppSelector } from '~/hooks/use-redux'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Button from '~/design-system/components/button/Button'

import { UserRoleEnum } from '~/types'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import QuizInfo from '~/components/quiz-info/QuizInfo'
import Timer from '~/components/timer/Timer'
import Points from '~/components/points/Points'

import styles from '~/containers/quiz/quiz-header/QuizHeader.styles'

type QuizHeaderProps = {
  isFinished: boolean
  title: string
  description: string
  points: number
  totalPoints: number
  showPoints: boolean
}

const QuizHeader = ({
  isFinished,
  title,
  description,
  points,
  totalPoints,
  showPoints
}: QuizHeaderProps) => {
  const { userRole } = useAppSelector((state) => state.appMain)
  const { t } = useTranslation()

  return (
    <Box sx={styles.wrapper}>
      <TitleWithDescription
        description={description}
        style={styles.titleWithDescription}
        title={title}
      />
      {isFinished && userRole === UserRoleEnum.Student && (
        <Box sx={styles.infoWrapper}>
          <QuizInfo
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
          <QuizInfo
            firstColumn='13:50 - 14:10'
            secondColumn='20 min'
            title={t('quiz.duration')}
          />
          <Divider
            flexItem
            orientation='vertical'
            sx={styles.divider}
            variant='middle'
          />
          <QuizInfo firstColumn='2/4' title={t('quiz.points')} />
        </Box>
      )}
      {!isFinished && userRole === UserRoleEnum.Student && (
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
            <Typography sx={styles.subtitle2}>1/4</Typography>
          </Box>
        </Box>
      )}
      {!isFinished && userRole === UserRoleEnum.Tutor && (
        <Box sx={styles.infoWrapper}>
          <QuizInfo
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
          <QuizInfo
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
          <QuizInfo firstColumn='-' title={t('quiz.points')} />
          <Box sx={styles.buttonWrapper}>
            <Button color='tonal' size='sm'>
              {t('quiz.evaluate')}
            </Button>
          </Box>
        </Box>
      )}
      {isFinished && userRole === UserRoleEnum.Tutor && (
        <Box sx={styles.infoWrapper}>
          {showPoints && (
            <Points
              points={points}
              title={t('quiz.points')}
              totalPoints={totalPoints}
            />
          )}
          <Box sx={styles.buttonWrapper}>
            <Button size='sm'>{t('quiz.save')}</Button>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default QuizHeader
