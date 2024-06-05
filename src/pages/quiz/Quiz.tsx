import { FC, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import useAxios from '~/hooks/use-axios'
import { ResourceService } from '~/services/resource-service'
import { ComponentEnum, QuizViewEnum, type Quiz } from '~/types'
import styles from './Quiz.styles'
import Box from '@mui/material/Box'
import SelectableQuestionQuizView from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestionQuizView'
import ScrollQuestionsQuizView from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView'
import { Chip, Divider, Typography } from '@mui/material'
import AppButton from '~/components/app-button/AppButton'
import useForm from '~/hooks/use-form'
import { countPoints } from './Quiz.constants'

const Quiz: FC = () => {
  const { quizId } = useParams()
  const { t } = useTranslation()

  const [isFinished, setIsFinished] = useState<boolean>(false)

  const getQuiz = useCallback(() => ResourceService.getQuiz(quizId), [quizId])

  const { handleInputChange, handleNonInputValueChange, data } = useForm<
    Record<string, string | string[]>
  >({
    initialValues: {}
  })

  const handleNonInputChange = (key: string) => (value: string | string[]) =>
    handleNonInputValueChange(key, value)

  const { loading, response } = useAxios<Quiz, string>({
    service: getQuiz,
    fetchOnMount: true
  })

  if (loading) return <Loader pageLoad />

  const handleFinish = () => setIsFinished(true)

  const showPoints = response.settings.pointValues && isFinished
  const showAnswersCorrectness = response.settings.scoredResponses && isFinished
  const showCorrectAnswers = response.settings.correctAnswers && isFinished

  const points = showPoints && countPoints(response.items, data)

  const isStepper = response.settings.view === QuizViewEnum.Stepper

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
        <TitleWithDescription
          description={response.description}
          style={styles.titleWithDescription}
          title={response.title}
        />
        {showPoints && (
          <Box sx={styles.points.root}>
            <Typography sx={styles.points.title}>{t('quiz.points')}</Typography>
            <Chip
              label={`${points}/${response.items.length}`}
              size='small'
              sx={styles.points.chip}
            />
          </Box>
        )}
        <Divider sx={styles.divider} />
        {isStepper ? (
          <SelectableQuestionQuizView
            answers={data}
            handleInputChange={handleInputChange}
            handleNonInputValueChange={handleNonInputChange}
            isEditable={!isFinished}
            questions={response.items}
            showAnswersCorrectness={showAnswersCorrectness}
            showCorrectAnswers={showCorrectAnswers}
            showPoints={showPoints}
            sx={styles.selectableQuestionQuizWrapper}
          />
        ) : (
          <ScrollQuestionsQuizView
            answers={data}
            handleInputChange={handleInputChange}
            handleNonInputValueChange={handleNonInputChange}
            isEditable={!isFinished}
            questions={response.items}
            showAnswersCorrectness={showAnswersCorrectness}
            showCorrectAnswers={showCorrectAnswers}
            showPoints={showPoints}
          />
        )}
        <Box sx={styles.finishBlock.root}>
          <AppButton onClick={handleFinish} sx={styles.finishBlock.button}>
            {t('quiz.finish')}
          </AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default Quiz
