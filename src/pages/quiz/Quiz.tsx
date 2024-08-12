import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SelectableQuestionQuizView from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestionQuizView'
import ScrollQuestionsQuizView from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView'
import AppButton from '~/components/app-button/AppButton'

import useAxios from '~/hooks/use-axios'
import useForm from '~/hooks/use-form'

import { ResourceService } from '~/services/resource-service'
import { countPoints } from '~/utils/count-quiz-points'
import styles from '~/pages/quiz/Quiz.styles'
import { defaultResponses } from '~/constants'

import { ComponentEnum, QuizViewEnum, Quiz } from '~/types'

const QuizPage = () => {
  const { quizId } = useParams()
  const { t } = useTranslation()

  const [isFinished, setIsFinished] = useState(false)

  const getQuiz = useCallback(() => ResourceService.getQuiz(quizId), [quizId])

  const { handleInputChange, handleNonInputValueChange, data } = useForm<
    Record<string, string | string[]>
  >({
    initialValues: defaultResponses.object
  })

  const handleNonInputChange = (key: string) => (value: string | string[]) =>
    handleNonInputValueChange(key, value)

  const { loading, response } = useAxios<Quiz, string>({
    service: getQuiz
  })

  if (loading) return <Loader pageLoad />

  const {
    settings: { pointValues, scoredResponses, correctAnswers, view },
    description,
    title,
    items
  } = response

  const handleFinish = () => setIsFinished(true)

  const showPoints = pointValues && isFinished
  const showAnswersCorrectness = scoredResponses && isFinished
  const showCorrectAnswers = correctAnswers && isFinished

  const points = showPoints && countPoints(items, data)

  const isStepper = view === QuizViewEnum.Stepper

  const pointsBlock = showPoints && (
    <Box sx={styles.points.root}>
      <Typography sx={styles.points.title}>{t('quiz.points')}</Typography>
      <Chip
        label={`${points}/${items.length}`}
        size='small'
        sx={styles.points.chip}
      />
    </Box>
  )

  const questionsBlock = isStepper ? (
    <SelectableQuestionQuizView
      answers={data}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable={!isFinished}
      questions={items}
      shouldShowAnswersCorrectness={showAnswersCorrectness}
      shouldShowCorrectAnswers={showCorrectAnswers}
      shouldShowPoints={showPoints}
      sx={styles.selectableQuestionQuizWrapper}
    />
  ) : (
    <ScrollQuestionsQuizView
      answers={data}
      data-testid='scroll-questions-quiz-view'
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable={!isFinished}
      questions={items}
      shouldShowAnswersCorrectness={showAnswersCorrectness}
      shouldShowCorrectAnswers={showCorrectAnswers}
      shouldShowPoints={showPoints}
    />
  )

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
        <TitleWithDescription
          description={description}
          style={styles.titleWithDescription}
          title={title}
        />
        {pointsBlock}
        <Divider sx={styles.divider} />
        {questionsBlock}
        <Box sx={styles.finishBlock.root}>
          <AppButton onClick={handleFinish} sx={styles.finishBlock.button}>
            {t('quiz.finish')}
          </AppButton>
        </Box>
      </Box>
    </PageWrapper>
  )
}

export default QuizPage
