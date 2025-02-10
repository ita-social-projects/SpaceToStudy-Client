import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'
import { useAppSelector } from '~/hooks/use-redux'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuizHeader from '~/containers/quiz/quiz-header/QuizHeader'
import SelectableQuestionQuizView from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestionQuizView'
import ScrollQuestionsQuizView from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView'
import Button from '~scss-components/button/Button'
import FinishQuizModal from '~/containers/quiz/finish-quiz-modal/FinishQuizModal'
import QuizInfoSection from '~/containers/quiz/quiz-info-section/QuizInfoSection'

import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import useForm from '~/hooks/use-form'

import { ResourceService } from '~/services/resource-service'
import { countPoints } from '~/utils/count-quiz-points'
import styles from '~/pages/quiz/Quiz.styles'
import { defaultResponses } from '~/constants'
import { defaultQuizResponse } from '~/pages/quiz/Quiz.constant'

import {
  ComponentEnum,
  QuestionTypesEnum,
  QuizViewEnum,
  UserRoleEnum
} from '~/types'
import { formatTime, getFormattedDate } from '~/utils/helper-functions'
import { Typography } from '@mui/material'

const QuizPage = () => {
  const { userRole } = useAppSelector((state) => state.appMain)

  const { id: cooperationId = '', quizId = '' } = useParams()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [isFinished, setIsFinished] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(true)

  const getQuiz = useCallback(() => {
    return ResourceService.getQuizQuery(quizId)
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

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const {
    settings: {
      pointValues,
      scoredResponses,
      correctAnswers,
      view,
      attemptLimit,
      timeLimit
    },
    description,
    title,
    items,
    createdAt,
    updatedAt
  } = quiz ?? defaultQuizResponse

  const points = countPoints(
    items.filter(({ type }) => type !== QuestionTypesEnum.OpenAnswer),
    data
  )
  const getQuizzes = useCallback(() => {
    return ResourceService.getFinishedQuizzesByQuizId(cooperationId, quizId)
  }, [cooperationId, quizId])

  const { data: finishedAttempts = [] } = useQuery({
    queryKey: ['finished-quizzes', cooperationId, quizId],
    queryFn: getQuizzes
  })

  const addFinishedQuiz = useCallback(() => {
    return ResourceService.addFinishedQuiz({
      cooperation: cooperationId,
      quiz: quizId,
      grade: Math.round((points / items.length) * 100),
      results: items.map(({ text, answers, _id }) => {
        return {
          question: text,
          answers: answers.map(({ text, isCorrect }) => ({
            text,
            isCorrect,
            isChosen: data[_id] === text
          }))
        }
      })
    })
  }, [data, cooperationId, items, points, quizId])

  const { mutate, data: finishedQuiz } = useMutation({
    mutationFn: addFinishedQuiz
  })

  const handleCancel = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleFinish = useCallback(() => {
    mutate()
    setIsOpen(false)
    setIsFinished(true)
    if (!scoredResponses) {
      navigate(-1)
    }
  }, [mutate, navigate, scoredResponses])

  if (isLoading || !quiz || !finishedAttempts) {
    return <Loader pageLoad />
  }

  const showPoints = pointValues && isFinished
  const showAnswersCorrectness = scoredResponses && isFinished
  const showCorrectAnswers = correctAnswers && isFinished

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
  const headerSettings = { attemptLimit, timeLimit }

  const finishButton = !isFinished && isStudent && (
    <Box sx={styles.finishBlock.root}>
      <Button onClick={openModal} sx={styles.finishBlock.button}>
        {t('quiz.finish')}
      </Button>
    </Box>
  )

  const questionsAnswered = Object.keys(data).length
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
      {showPreview ? (
        <Box>
          <QuizHeader
            createdAt={finishedQuiz?.createdAt ?? createdAt}
            description={description}
            handlePreview={setShowPreview}
            isFinished={false}
            isGraded={false}
            isNotStarted={showPreview}
            points={0}
            questionsAnswered={questionsAnswered}
            quizItems={items}
            settings={headerSettings}
            title={title}
            totalPoints={items.length}
            updatedAt={finishedQuiz?.updatedAt ?? updatedAt}
            usedAttempts={finishedAttempts.length}
          />
          <Divider sx={styles.divider} />
          {attemptsList}
        </Box>
      ) : (
        <Box>
          <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
            <QuizHeader
              createdAt={finishedQuiz?.createdAt ?? createdAt}
              description={description}
              handlePreview={setShowPreview}
              isFinished={isFinished}
              isGraded={showPoints}
              isNotStarted={showPreview}
              points={points ?? 0}
              questionsAnswered={questionsAnswered}
              quizItems={items}
              settings={headerSettings}
              title={title}
              totalPoints={items.length}
              updatedAt={finishedQuiz?.updatedAt ?? updatedAt}
              usedAttempts={finishedAttempts.length}
            />
            <Divider sx={styles.divider} />
            {questionsBlock}
            {finishButton}
          </Box>
          <FinishQuizModal
            onCancel={handleCancel}
            onFinish={handleFinish}
            open={isOpen}
          />
        </Box>
      )}
    </PageWrapper>
  )
}

export default QuizPage
