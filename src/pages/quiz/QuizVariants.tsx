import { useState, useEffect, useMemo, useCallback } from 'react'
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

import {
  ComponentEnum,
  QuestionTypesEnum,
  QuizTimeLimit,
  QuizViewEnum
} from '~/types'
import { getTime } from '~/utils/helper-functions'
import { authRoutes } from '~/router/constants/authRoutes'
import { getFullUrl } from '~/utils/get-full-url'

const ActiveQuiz: React.FC = () => {
  const { id: cooperationId = '', quizId = '' } = useParams()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const [isOpen, setIsOpen] = useState(false)
  const [finishedQuizId, setFinishedQuizId] = useState('')

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
    settings: { view, scoredResponses, timeLimit },
    description,
    title,
    items,
    createdAt,
    updatedAt
  } = quiz ?? defaultQuizResponse

  const hasTimeLimit = timeLimit !== QuizTimeLimit.NoLimit

  const initialTime = useMemo(() => {
    return getTime(timeLimit ?? QuizTimeLimit.NoLimit)
  }, [timeLimit])

  const points = countPoints(
    items.filter(({ type }) => type !== QuestionTypesEnum.OpenAnswer),
    data
  )

  const openModal = useCallback(() => {
    setIsOpen(true)
  }, [])

  const grade = Math.round((points / items.length) * 100)

  const mappedResults = useMemo(() => {
    return items.map(({ text, answers, _id }) => {
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
  }, [data, items])

  const addFinishedQuiz = useCallback(() => {
    return ResourceService.addFinishedQuiz({
      cooperation: cooperationId,
      quiz: quizId,
      grade,
      results: mappedResults
    })
  }, [cooperationId, grade, mappedResults, quizId])

  const { handleErrorAlert } = useSnackbarAlert()

  const { mutateAsync: createFinishedQuiz } = useMutation({
    mutationFn: addFinishedQuiz,
    queryKey: ['finished-quizzes'],
    onError: handleErrorAlert
  })

  const editFinishedQuiz = useCallback(() => {
    return ResourceService.editFinishedQuiz(finishedQuizId, {
      grade,
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
  }, [data, finishedQuizId, grade, items])

  const { mutate: updateFinishedQuiz } = useMutation({
    mutationFn: editFinishedQuiz,
    queryKey: ['finished-quizzes'],
    onError: handleErrorAlert
  })

  const isStepper = view === QuizViewEnum.Stepper

  const questionsBlock = isStepper ? (
    <SelectableQuestionQuizView
      answers={data}
      handleInputChange={handleInputChange}
      handleNonInputValueChange={handleNonInputChange}
      isEditable
      onNextButtonClick={updateFinishedQuiz}
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

  const handleCancel = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleFinish = useCallback(() => {
    updateFinishedQuiz()
    setIsOpen(false)

    if (scoredResponses) {
      navigate(
        getFullUrl({
          pathname: authRoutes.cooperationQuizReview.route,
          parameters: { id: cooperationId, quizId, attemptId: finishedQuizId }
        })
      )
    } else {
      navigate(-1)
    }
  }, [
    scoredResponses,
    cooperationId,
    quizId,
    finishedQuizId,
    navigate,
    updateFinishedQuiz
  ])

  const questionsAnswered = Object.keys(data).length

  useEffect(() => {
    const postFinishedQuiz = async () => {
      const finishedQuiz = await createFinishedQuiz()
      setFinishedQuizId(finishedQuiz?._id)
    }

    void postFinishedQuiz()
  }, [createFinishedQuiz])

  if (isLoading || !quiz) {
    return <Loader pageLoad />
  }

  return (
    <PageWrapper sx={styles.quizzesWrapper}>
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
        <QuizHeader
          createdAt={createdAt}
          description={description}
          hasTimeLimit={hasTimeLimit}
          initialTime={initialTime}
          onTimeEnd={handleFinish}
          points={points}
          questionsAnswered={questionsAnswered}
          title={title}
          totalPoints={items.length}
          type='active'
          updatedAt={updatedAt}
        />
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
        onFinish={handleFinish}
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
    queryKey: ['finished-quizzes', finishedQuizId],
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
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
        <QuizHeader
          createdAt={finishedQuiz.createdAt}
          description={description}
          points={items.length}
          title={title}
          totalPoints={finishedQuiz.results?.length}
          type='finished'
          updatedAt={finishedQuiz.updatedAt}
        />
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
      <Box component={ComponentEnum.Form} sx={styles.quizzesWrapper}>
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
        <Divider sx={styles.divider} />
        {questionsBlock}
      </Box>
    </PageWrapper>
  )
}

export { ActiveQuiz, FinishedQuiz, TutorQuiz }
