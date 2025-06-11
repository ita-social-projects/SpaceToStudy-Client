import { ChangeEventHandler, FC, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormGroup from '@mui/material/FormGroup'
import RadioGroup from '@mui/material/RadioGroup'
import AppCard from '~/components/app-card/AppCard'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import Answer from '~/containers/quiz/question-answer/Answer'
import { SxProps } from '@mui/material/styles'

import { determineQuestionType } from '~/components/question-editor/QuestionEditor.constants'
import { isCorrectAnswer } from '~/utils/is-correct-answer'
import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/containers/quiz/quiz-question/Question.styles'

import { type Question, UserRoleEnum } from '~/types'
import { AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'
import { useAppSelector } from '~/hooks/use-redux'

import TutorAnswerGrading from '~/containers/quiz/quiz-question/TutorAnswerGrading'
import useQuery from '~/hooks/use-query'
import { ResourceService } from '~/services/resource-service'
import { useParams } from 'react-router-dom'

interface QuizQuestionProps {
  question: Question
  index: number
  value: string | null | string[]
  shouldShowCorrectAnswers?: boolean
  shouldShowPoints?: boolean
  shouldShowAnswersCorrectness?: boolean
  isEditable?: boolean
  shouldUseAppCardWrapper?: boolean
  sx?: SxProps
  handleInputChange: ChangeEventHandler
  handleNonInputValueChange: (value: string | string[]) => void
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  shouldUseAppCardWrapper,
  sx,
  index,
  shouldShowPoints,
  shouldShowCorrectAnswers,
  shouldShowAnswersCorrectness,
  value,
  question,
  isEditable,
  handleInputChange,
  handleNonInputValueChange
}) => {
  const { t } = useTranslation()
  const { userRole } = useAppSelector((state) => state.appMain)
  const { attemptId = '' } = useParams()
  const initialIsCorrect = isCorrectAnswer(question, value)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | undefined>(
    undefined
  )

  const getFinishedQuiz = () => {
    return ResourceService.getFinishedQuiz(attemptId)
  }

  const ContainerComponent = shouldUseAppCardWrapper ? AppCard : Box
  let answersBlock
  let correctnessIcon
  let formattedValue: string[] = []

  const { data: finishedQuiz, isLoading: isFinishedQuizLoading } = useQuery({
    queryKey: ['finished-quiz', attemptId],
    queryFn: getFinishedQuiz
  })

  const { isMultipleChoice, isOpenAnswer } = determineQuestionType(
    question.type
  )

  useEffect(() => {
    const shouldCheckAnswer =
      isOpenAnswer && finishedQuiz && !isFinishedQuizLoading

    if (shouldCheckAnswer) {
      const currentResult = finishedQuiz.results?.find(
        (res) => res.question === question.text
      )
      const firstAnswer = currentResult?.answers?.[0]

      if (firstAnswer) {
        setIsAnswerCorrect(firstAnswer.isCorrect)
      }
    }

    if (!isOpenAnswer) {
      setIsAnswerCorrect(initialIsCorrect)
    }
  }, [
    finishedQuiz,
    isFinishedQuizLoading,
    isOpenAnswer,
    question.text,
    initialIsCorrect
  ])

  const answerSx =
    isAnswerCorrect === undefined
      ? {}
      : { backgroundColor: isAnswerCorrect ? 'success.50' : 'error.50' }

  if (Array.isArray(value)) {
    formattedValue = value.map((v) => v.toLowerCase())
  } else if (typeof value === 'string') {
    formattedValue = [value.toLowerCase()]
  }

  const answersList = question.answers.map((answer) => {
    const isChecked = formattedValue.includes(answer.text.toLowerCase())

    const handleChange = () => {
      if (isMultipleChoice) {
        const prev = (value as string[]) ?? []
        const newValue = prev.includes(answer.text)
          ? prev.filter((item) => item !== answer.text)
          : [...prev, answer.text]

        handleNonInputValueChange(newValue)
      } else {
        handleNonInputValueChange(answer.text)
      }
    }

    return (
      <Answer
        checked={isChecked}
        isCorrect={answer.isCorrect}
        isEditable={isEditable}
        key={answer.text}
        label={answer.text}
        onCheckboxChange={handleChange}
        shouldShowCorrectness={shouldShowAnswersCorrectness}
        text={answer.text}
        type={question.type}
        value={answer.text}
      />
    )
  })

  if (isOpenAnswer) {
    answersBlock = (
      <Answer
        isCorrect={isAnswerCorrect}
        isEditable={isEditable}
        label={question.text}
        onTextInputChange={handleInputChange}
        shouldShowCorrectness={shouldShowAnswersCorrectness}
        sx={answerSx}
        text={question.text}
        type={question.type}
        value={typeof value === 'string' ? value : ''}
      />
    )
  } else if (isMultipleChoice) {
    answersBlock = (
      <FormGroup sx={styles.answersContainer}>{answersList}</FormGroup>
    )
  } else {
    answersBlock = (
      <RadioGroup sx={styles.answersContainer}>{answersList}</RadioGroup>
    )
  }

  const answersBlockForTutors = isOpenAnswer ? (
    <Box sx={styles.tutorOpenAnswerContainer}>
      <Answer
        isCorrect={isAnswerCorrect}
        isEditable={isEditable}
        label={question.text}
        onTextInputChange={handleInputChange}
        shouldShowCorrectness={shouldShowAnswersCorrectness}
        sx={answerSx}
        text={question.text}
        type={question.type}
        value={typeof value === 'string' ? value : ''}
      />
      <TutorAnswerGrading
        onUpdate={(isCorrect) => setIsAnswerCorrect(isCorrect)}
        questionText={question.text}
      />
    </Box>
  ) : (
    answersBlock
  )

  const correctAnswersList =
    shouldShowCorrectAnswers &&
    question.answers
      .filter((item) => item.isCorrect)
      .map((item) => (
        <Answer
          checked
          isCorrect={item.isCorrect}
          isEditable={false}
          key={item.text}
          label={item.text}
          shouldShowCorrectness
          text={item.text}
          type={question.type}
        />
      ))

  const correctAnswers = shouldShowCorrectAnswers && (
    <Box sx={styles.correctAnswers.root}>
      <Typography sx={styles.correctAnswers.title}>
        {t('myResourcesPage.quizzes.correctAnswers')}
      </Typography>
      <Box sx={styles.correctAnswers.list}>
        {isOpenAnswer ? (
          <Typography sx={{ color: 'text.secondary' }}>
            {t(
              userRole === UserRoleEnum.Student
                ? 'myResourcesPage.questions.reviewMessage'
                : 'myResourcesPage.questions.teacherMessage'
            )}
          </Typography>
        ) : (
          correctAnswersList
        )}
      </Box>
    </Box>
  )

  if (shouldShowAnswersCorrectness && isAnswerCorrect !== undefined) {
    if (isAnswerCorrect) {
      correctnessIcon = <CheckIcon sx={styles.icon(AnswerStatusEnum.Correct)} />
    } else {
      correctnessIcon = (
        <CloseIcon sx={styles.icon(AnswerStatusEnum.Incorrect)} />
      )
    }
  }

  const pointsBlock =
    shouldShowPoints && isAnswerCorrect !== undefined ? (
      <Typography sx={styles.type}>
        {isAnswerCorrect ? '1/1' : '0/1'}
      </Typography>
    ) : null

  return (
    <ContainerComponent sx={spliceSx(styles.root, sx)}>
      <Box sx={styles.typeContainer}>
        <Typography sx={styles.type}>
          {t(`questionPage.questionType.${question.type}`)}
        </Typography>
        {pointsBlock}
      </Box>

      <Box sx={styles.titleContainer}>
        {correctnessIcon}
        <Typography sx={styles.title}>{index + 1}.</Typography>
        <Typography sx={styles.title}>{question.text}</Typography>
      </Box>
      {userRole === UserRoleEnum.Student ? answersBlock : answersBlockForTutors}
      {correctAnswers}
    </ContainerComponent>
  )
}

export default QuizQuestion
