import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuizHeader from '~/containers/quiz/quiz-header/QuizHeader'
import SelectableQuestionQuizView from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestionQuizView'
import ScrollQuestionsQuizView from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView'
import AppButton from '~/components/app-button/AppButton'

import useQuery from '~/hooks/use-query'
import useForm from '~/hooks/use-form'

import { ResourceService } from '~/services/resource-service'
import { countPoints } from '~/utils/count-quiz-points'
import styles from '~/pages/quiz/Quiz.styles'
import { defaultResponses } from '~/constants'
import { defaultQuizResponse } from '~/pages/quiz/Quiz.constant'

import { ComponentEnum, QuizViewEnum, UserRoleEnum } from '~/types'

const QuizPage = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const { quizId } = useParams()
  const { t } = useTranslation()

  const [isFinished, setIsFinished] = useState(false)

  const getQuiz = useCallback(() => {
    if (quizId) {
      return ResourceService.getQuizQuery(quizId)
    }
    return defaultQuizResponse
  }, [quizId])

  const { handleInputChange, handleNonInputValueChange, data } = useForm<
    Record<string, string | string[]>
  >({
    initialValues: defaultResponses.object
  })

  const handleNonInputChange = (key: string) => (value: string | string[]) =>
    handleNonInputValueChange(key, value)

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: getQuiz
  })

  const handleFinish = useCallback(() => {
    setIsFinished(true)
  }, [])

  if (isLoading || !quiz) {
    return <Loader pageLoad />
  }

  const {
    settings: { pointValues, scoredResponses, correctAnswers, view },
    description,
    title,
    items
  } = quiz

  const showPoints = pointValues && isFinished
  const showAnswersCorrectness = scoredResponses && isFinished
  const showCorrectAnswers = correctAnswers && isFinished

  const points = showPoints && countPoints(items, data)

  const isStepper = view === QuizViewEnum.Stepper

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

  const isStudent = userRole === UserRoleEnum.Student

  const finishButton = !isFinished && isStudent && (
    <Box sx={styles.finishBlock.root}>
      <AppButton onClick={handleFinish} sx={styles.finishBlock.button}>
        {t('quiz.finish')}
      </AppButton>
    </Box>
  )

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
        <QuizHeader
          description={description}
          isFinished={isFinished}
          isGraded={showPoints}
          points={points || 0}
          title={title}
          totalPoints={items.length}
        />
        <Divider sx={styles.divider} />
        {questionsBlock}
        {finishButton}
      </Box>
    </PageWrapper>
  )
}

export default QuizPage
