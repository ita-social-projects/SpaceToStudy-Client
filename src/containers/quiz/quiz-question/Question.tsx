import { ChangeEventHandler, FC } from 'react'
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

import { Question } from '~/types'
import { AnswerStatusEnum } from '~/containers/quiz/question-answer/Answer.types'

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

  const { isMultipleChoice, isOpenAnswer } = determineQuestionType(
    question.type
  )

  const ContainerComponent = shouldUseAppCardWrapper ? AppCard : Box

  const isCorrect = isCorrectAnswer(question, value)

  const iconStyles = styles.icon(
    isCorrect ? AnswerStatusEnum.Correct : AnswerStatusEnum.Incorrect
  )

  const correctnessIcon =
    shouldShowAnswersCorrectness &&
    (isCorrect ? <CheckIcon sx={iconStyles} /> : <CloseIcon sx={iconStyles} />)

  const showCorrectAnswers = shouldShowCorrectAnswers && !isOpenAnswer

  const correctAnswersList =
    showCorrectAnswers &&
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

  const correctAnswers = showCorrectAnswers && (
    <Box sx={styles.correctAnswers.root}>
      <Typography sx={styles.correctAnswers.title}>
        {t('myResourcesPage.quizzes.correctAnswers')}
      </Typography>
      <Box sx={styles.correctAnswers.list}>{correctAnswersList}</Box>
    </Box>
  )

  const answersList = question.answers.map((answer) => {
    const isChecked =
      value && isMultipleChoice
        ? value.includes(answer.text)
        : value === answer.text

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
      isCorrect
      isEditable={isEditable}
      label={question.text}
      onTextInputChange={handleInputChange}
      shouldShowCorrectness={shouldShowAnswersCorrectness}
      text={question.text}
      type={question.type}
      value={value as string}
    />
  ) : (
    multipleChoiceAnswersBlock
  )

  const pointsBlock = shouldShowPoints && (
    <Typography sx={styles.type}>{Number(isCorrect)}/1</Typography>
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
      {answersBlock}

      {correctAnswers}
    </ContainerComponent>
  )
}

export default QuizQuestion
