import { useState, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import Loader from '~/components/loader/Loader'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import QuizHeader from '~/containers/quiz/quiz-header/QuizHeader'
import SelectableQuestionQuizView from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestionQuizView'
import ScrollQuestionsQuizView from '~/containers/quiz/scroll-question-quiz-view/ScrollQuestionsQuizView'
import Button from '~scss-components/button/Button'
import FinishQuizModal from '~/containers/quiz/finish-quiz-modal/FinishQuizModal'

import useQuery from '~/hooks/use-query'
import useMutation from '~/hooks/use-mutation'
import useSnackbarAlert from '~/hooks/use-snackbar-alert'
import useForm from '~/hooks/use-form'
import useQuizQuery from '~/hooks/query/use-quiz-query'

import { ResourceService } from '~/services/resource-service'
import { countPoints } from '~/utils/count-quiz-points'
import styles from '~/pages/quiz/Quiz.styles'
import { defaultResponses } from '~/constants'
import { defaultQuizResponse } from '~/pages/quiz/Quiz.constant'

import { ComponentEnum, QuestionTypesEnum, QuizViewEnum } from '~/types'

type ActiveQuizProps = {
  finishQuiz: (quizId: string) => void
}

const ActiveQuiz: React.FC<ActiveQuizProps> = ({ finishQuiz }) => {
  const { id: cooperationId = '', quizId = '' } = useParams()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)

  const { handleInputChange, handleNonInputValueChange, data } = useForm<
    Record<string, string | string[]>
  >({
    initialValues: defaultResponses.object
  })

  const handleNonInputChange = (key: string) => (value: string | string[]) => {
    handleNonInputValueChange(key, value)
  }

  const { quiz, isLoading } = useQuizQuery(quizId)

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const {
    settings: { scoredResponses, view },
    description,
    title,
    items,
    createdAt,
    updatedAt
  } = quiz ?? defaultQuizResponse

  const isStepper = view === QuizViewEnum.Stepper

  const questionsBlock = isStepper ? (
    <SelectableQuestionQuizView
      answers={data}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable
      questions={items}
      sx={styles.selectableQuestionQuizWrapper}
    />
  ) : (
    <ScrollQuestionsQuizView
      answers={data}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable
      questions={items}
    />
  )

  const points = countPoints(
    items.filter(({ type }) => type !== QuestionTypesEnum.OpenAnswer),
    data
  )

  const addFinishedQuiz = useCallback(() => {
    return ResourceService.addFinishedQuiz({
      cooperation: cooperationId,
      quiz: quizId,
      grade: Math.round((points / items.length) * 100),
      results: items.map(({ text, answers, _id }) => {
        return {
          question: text,
          answers: answers.map(({ text, isCorrect }) => {
            return {
              text,
              isCorrect,
              isChosen: data[_id]?.includes(text) ?? false
            }
          })
        }
      })
    })
  }, [data, cooperationId, items, points, quizId])

  const { handleErrorAlert } = useSnackbarAlert()

  const { mutateAsync } = useMutation({
    mutationFn: addFinishedQuiz,
    queryKey: ['finished-quizzes'],
    onError: handleErrorAlert
  })

  const handleCancel = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleFinish = useCallback(async () => {
    const finishedQuiz = await mutateAsync()
    setIsOpen(false)
    finishQuiz(finishedQuiz?._id)
    if (!scoredResponses) {
      navigate(-1)
    }
  }, [finishQuiz, mutateAsync, navigate, scoredResponses])

  const questionsAnswered = Object.keys(data).length

  if (isLoading || !quiz) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <QuizHeader
        createdAt={createdAt}
        description={description}
        points={points}
        questionsAnswered={questionsAnswered}
        title={title}
        totalPoints={items.length}
        type='active'
        updatedAt={updatedAt}
      />
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
        <Divider sx={styles.divider} />
        {questionsBlock}
        <Box sx={styles.finishBlock.root}>
          <Button onClick={openModal} sx={styles.finishBlock.button}>
            {t('quiz.finish')}
          </Button>
        </Box>
      </Box>
      <FinishQuizModal
        onCancel={handleCancel}
        onFinish={() => void handleFinish()}
        open={isOpen}
      />
    </PageWrapper>
  )
}

type FinishedQuizProps = {
  finishedQuizId: string
}

const FinishedQuiz: React.FC<FinishedQuizProps> = ({ finishedQuizId }) => {
  const { quizId = '' } = useParams()

  const getFinishedQuiz = useCallback(() => {
    return ResourceService.getFinishedQuiz(finishedQuizId)
  }, [finishedQuizId])

  const { handleInputChange, handleNonInputValueChange } = useForm<
    Record<string, string | string[]>
  >({
    initialValues: defaultResponses.object
  })

  const handleNonInputChange = (key: string) => (value: string | string[]) => {
    handleNonInputValueChange(key, value)
  }

  const { data: finishedQuiz, isLoading: isFinishedQuizLoading } = useQuery({
    queryKey: ['finishedQuiz', finishedQuizId],
    queryFn: getFinishedQuiz
  })

  const { quiz, isLoading: isQuizLoading } = useQuizQuery(quizId)

  const {
    settings: { pointValues, scoredResponses, correctAnswers, view },
    description,
    title,
    items
  } = quiz ?? defaultQuizResponse

  const isStepper = view === QuizViewEnum.Stepper

  const mappedResults = useMemo(() => {
    const result: Record<string, string | string[]> = {}
    finishedQuiz?.results?.forEach(({ question, answers }) => {
      const quizQuestion = quiz?.items.find((item) => item.text === question)
      const quizQuestionId = quizQuestion?._id
      if (quizQuestionId) {
        const chosenAnswers = answers.filter((answer) => answer.isChosen)
        const textAnswers = chosenAnswers.map(
          (chosenAnswer) => chosenAnswer.text
        )
        result[quizQuestionId] = textAnswers
      }
    })

    return result
  }, [finishedQuiz?.results, quiz?.items])

  const questionsBlock = isStepper ? (
    <SelectableQuestionQuizView
      answers={mappedResults}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      questions={items}
      shouldShowAnswersCorrectness={scoredResponses}
      shouldShowCorrectAnswers={correctAnswers}
      shouldShowPoints={pointValues}
      sx={styles.selectableQuestionQuizWrapper}
    />
  ) : (
    <ScrollQuestionsQuizView
      answers={mappedResults}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      questions={items}
      shouldShowAnswersCorrectness={scoredResponses}
      shouldShowCorrectAnswers={correctAnswers}
      shouldShowPoints={pointValues}
    />
  )

  if (isFinishedQuizLoading || !finishedQuiz || isQuizLoading) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <QuizHeader
        createdAt={finishedQuiz.createdAt}
        description={description}
        points={items.length}
        title={title}
        totalPoints={finishedQuiz.results?.length}
        type='finished'
        updatedAt={finishedQuiz.updatedAt}
      />
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
        <Divider sx={styles.divider} />
        {questionsBlock}
      </Box>
    </PageWrapper>
  )
}

const TutorQuiz: React.FC = () => {
  const { quizId = '' } = useParams()

  const { handleInputChange, handleNonInputValueChange, data } = useForm<
    Record<string, string | string[]>
  >({
    initialValues: defaultResponses.object
  })

  const handleNonInputChange = (key: string) => (value: string | string[]) => {
    handleNonInputValueChange(key, value)
  }

  const { quiz, isLoading } = useQuizQuery(quizId)

  const {
    settings: { view },
    items
  } = quiz ?? defaultQuizResponse

  const isStepper = view === QuizViewEnum.Stepper

  const questionsBlock = isStepper ? (
    <SelectableQuestionQuizView
      answers={data}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      questions={items}
      sx={styles.selectableQuestionQuizWrapper}
    />
  ) : (
    <ScrollQuestionsQuizView
      answers={data}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      questions={items}
    />
  )

  if (isLoading || !quiz) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <QuizHeader
        createdAt={''}
        description={''}
        points={0}
        questionsAnswered={0}
        title={''}
        totalPoints={0}
        type='tutor'
        updatedAt={''}
      />
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
        <Divider sx={styles.divider} />
        {questionsBlock}
      </Box>
    </PageWrapper>
  )
}

export { ActiveQuiz, FinishedQuiz, TutorQuiz }
