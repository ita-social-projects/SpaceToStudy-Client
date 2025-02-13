import { useState, useCallback } from 'react'
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
import useForm from '~/hooks/use-form'

import { ResourceService } from '~/services/resource-service'
import { countPoints } from '~/utils/count-quiz-points'
import styles from '~/pages/quiz/Quiz.styles'
import { defaultResponses } from '~/constants'
import { defaultQuizResponse } from '~/pages/quiz/Quiz.constant'

import { ComponentEnum, QuestionTypesEnum, QuizViewEnum } from '~/types'

type ActiveQuizProps = {
  finishQuiz: (quizId: string) => void
}

const ActiveQuiz = ({ finishQuiz }: ActiveQuizProps) => {
  const { id: cooperationId = '', quizId = '' } = useParams()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)

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
    settings: { scoredResponses, view },
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
              isChosen: data[_id].includes(text)
            }
          })
        }
      })
    })
  }, [data, cooperationId, items, points, quizId])

  const { mutateAsync } = useMutation({
    mutationFn: addFinishedQuiz
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

  const handleFinishWrapper = () => {
    void handleFinish()
  }

  if (isLoading || !quiz) {
    return <Loader pageLoad />
  }

  const isStepper = view === QuizViewEnum.Stepper

  const questionsBlock = isStepper ? (
    <SelectableQuestionQuizView
      answers={data}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable
      questions={items}
      shouldShowAnswersCorrectness={false}
      shouldShowCorrectAnswers={false}
      shouldShowPoints={false}
      sx={styles.selectableQuestionQuizWrapper}
    />
  ) : (
    <ScrollQuestionsQuizView
      answers={data}
      data-testid='scroll-questions-quiz-view'
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable
      questions={items}
      shouldShowAnswersCorrectness={false}
      shouldShowCorrectAnswers={false}
      shouldShowPoints={false}
    />
  )

  const questionsAnswered = Object.keys(data).length

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <Box>
        <Box>
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
        </Box>
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
          onFinish={handleFinishWrapper}
          open={isOpen}
        />
      </Box>
    </PageWrapper>
  )
}

type FinishedQuizProps = {
  finishedQuizId: string
}

const FinishedQuiz = ({ finishedQuizId }: FinishedQuizProps) => {
  const { quizId = '' } = useParams()

  const getFinishedQuiz = useCallback(() => {
    return ResourceService.getFinishedQuiz(finishedQuizId)
  }, [finishedQuizId])

  const getQuiz = useCallback(() => {
    return ResourceService.getQuizQuery(quizId)
  }, [quizId])

  const { handleInputChange, handleNonInputValueChange } = useForm<
    Record<string, string | string[]>
  >({
    initialValues: defaultResponses.object
  })

  const handleNonInputChange = (key: string) => (value: string | string[]) =>
    handleNonInputValueChange(key, value)

  const { data: finishedQuiz, isLoading } = useQuery({
    queryKey: ['finishedQuiz', finishedQuizId],
    queryFn: getFinishedQuiz
  })

  const { data: quiz, isLoading: isQuizLoading } = useQuery({
    queryKey: ['quiz', quizId],
    queryFn: getQuiz
  })

  const {
    settings: { pointValues, scoredResponses, correctAnswers, view },
    description,
    title,
    items
  } = quiz ?? defaultQuizResponse

  if (isLoading || !finishedQuiz || isQuizLoading) {
    return <Loader pageLoad />
  }

  const isStepper = view === QuizViewEnum.Stepper

  const mapResults = () => {
    const result: Record<string, string | string[]> = {}
    finishedQuiz.results.forEach(({ question, answers }) => {
      const id = quiz?.items.find(({ text }) => text === question)?._id
      if (id) {
        result[id] = answers
          .filter((answer) => answer.isChosen)
          .map(({ text, isChosen }) => {
            if (isChosen) {
              return text
            }
          }) as string[]
      }
    })

    return result
  }

  const questionsBlock = isStepper ? (
    <SelectableQuestionQuizView
      answers={mapResults()}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable={false}
      questions={items}
      shouldShowAnswersCorrectness={scoredResponses}
      shouldShowCorrectAnswers={correctAnswers}
      shouldShowPoints={pointValues}
      sx={styles.selectableQuestionQuizWrapper}
    />
  ) : (
    <ScrollQuestionsQuizView
      answers={mapResults()}
      data-testid='scroll-questions-quiz-view'
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable={false}
      questions={items}
      shouldShowAnswersCorrectness={scoredResponses}
      shouldShowCorrectAnswers={correctAnswers}
      shouldShowPoints={pointValues}
    />
  )

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <Box>
        <QuizHeader
          createdAt={finishedQuiz.createdAt}
          description={description}
          points={items.length}
          title={title}
          totalPoints={finishedQuiz.results.length}
          type='finished'
          updatedAt={finishedQuiz.updatedAt}
        />
        <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
          <Divider sx={styles.divider} />
          {questionsBlock}
        </Box>
      </Box>
    </PageWrapper>
  )
}

const TutorQuiz = () => {
  const { quizId = '' } = useParams()

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

  const {
    settings: { view },
    items
  } = quiz ?? defaultQuizResponse

  if (isLoading || !quiz) {
    return <Loader pageLoad />
  }

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
      data-testid='scroll-questions-quiz-view'
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      questions={items}
    />
  )

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <Box>
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
      </Box>
    </PageWrapper>
  )
}

export { ActiveQuiz, FinishedQuiz, TutorQuiz }
