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

import { Question, UserRoleEnum } from '~/types'
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
    initialIsCorrect
  )

  const getFinishedQuiz = () => {
    return ResourceService.getFinishedQuiz(attemptId)
  }

  const { data: finishedQuiz, isLoading: isFinishedQuizLoading } = useQuery({
    queryKey: ['finished-quiz', attemptId],
    queryFn: getFinishedQuiz
  })

  const { isMultipleChoice, isOpenAnswer } = determineQuestionType(
    question.type
  )

  useEffect(() => {
    if (isOpenAnswer && finishedQuiz && !isFinishedQuizLoading) {
      const questionResult = finishedQuiz.results?.find(
        (result) => result.question === question.text
      )

      if (questionResult && questionResult.answers.length > 0) {
        const resultIsCorrect = questionResult.answers[0].isCorrect
        setIsAnswerCorrect(resultIsCorrect)
      }
    }
  }, [finishedQuiz, isFinishedQuizLoading, isOpenAnswer, question.text])
  const ContainerComponent = shouldUseAppCardWrapper ? AppCard : Box

  const iconStyles = styles.icon(
    isAnswerCorrect ? AnswerStatusEnum.Correct : AnswerStatusEnum.Incorrect
  )

  const correctnessIcon =
    shouldShowAnswersCorrectness &&
    (isAnswerCorrect ? (
      <CheckIcon sx={iconStyles} />
    ) : (
      <CloseIcon sx={iconStyles} />
    ))

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
      <Box sx={styles.correctAnswers.list}>{correctAnswersList}</Box>
    </Box>
  )

  const correctnessColor = isAnswerCorrect ? 'success.50' : 'error.50'

  const answersList = question.answers.map((answer) => {
    const formattedValue =
      typeof value === 'string'
        ? value.toLowerCase()
        : value?.map((v) => v.toLowerCase())
    const isChecked =
      formattedValue?.includes(answer.text.toLowerCase()) ?? false

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

  const multipleChoiceAnswersBlock = isMultipleChoice ? (
    <FormGroup sx={styles.answersContainer}>{answersList}</FormGroup>
  ) : (
    <RadioGroup sx={styles.answersContainer}>{answersList}</RadioGroup>
  )

  const answersBlock = isOpenAnswer ? (
    <Answer
      isCorrect={isAnswerCorrect}
      isEditable={isEditable}
      label={question.text}
      onTextInputChange={handleInputChange}
      shouldShowCorrectness={shouldShowAnswersCorrectness}
      sx={{ backgroundColor: correctnessColor }}
      text={question.text}
      type={question.type}
      value={value as string}
    />
  ) : (
    multipleChoiceAnswersBlock
  )

  const answersBlockForTutors = isOpenAnswer ? (
    <Box sx={styles.tutorOpenAnswerContainer}>
      <Answer
        isCorrect={isAnswerCorrect}
        isEditable={isEditable}
        label={question.text}
        onTextInputChange={handleInputChange}
        shouldShowCorrectness={shouldShowAnswersCorrectness}
        sx={{ backgroundColor: correctnessColor }}
        text={question.text}
        type={question.type}
        value={value as string}
      />
      <TutorAnswerGrading
        onUpdate={(isCorrect) => setIsAnswerCorrect(isCorrect)}
        questionText={question.text}
      />
    </Box>
  ) : (
    multipleChoiceAnswersBlock
  )

  const pointsBlock = shouldShowPoints && (
    <Typography sx={styles.type}>{Number(isAnswerCorrect)}/1</Typography>
  )
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
      {userRole === UserRoleEnum.Student && answersBlock}
      {userRole === UserRoleEnum.Tutor && answersBlockForTutors}

      {correctAnswers}
    </ContainerComponent>
  )
}

export default QuizQuestion
