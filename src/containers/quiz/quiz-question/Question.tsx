import { ChangeEventHandler, FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Typography, FormGroup, RadioGroup, SxProps } from '@mui/material'
import { questionType } from '~/components/question-editor/QuestionEditor.constants'
import AppCard from '~/components/app-card/AppCard'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'

import { Question } from '~/types'
import { styles } from './Question.styles'
import { isCorrectAnswer } from './Question.constants'
import Answer from '../question-answer/Answer'
import { spliceSx } from '~/utils/helper-functions'

interface QuizQuestionProps {
  question: Question
  index: number
  value: string | null | string[]
  showCorrectAnswers?: boolean
  showPoints?: boolean
  showAnswersCorrectness?: boolean
  isEditable?: boolean
  useAppCard?: boolean
  sx?: SxProps
  handleInputChange: ChangeEventHandler
  handleNonInputValueChange: (value: string | string[]) => void
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  useAppCard,
  sx,
  index,
  showPoints,
  showCorrectAnswers,
  showAnswersCorrectness,
  value,
  question,
  isEditable,
  handleInputChange,
  handleNonInputValueChange
}) => {
  const { t } = useTranslation()

  const { isMultipleChoice, isSingleChoice, isOpenAnswer } = questionType(
    question.type
  )

  const ContainerComponent = useAppCard ? AppCard : Box

  const isCorrect = isCorrectAnswer(question, value)

  const iconStyles = styles.icon(isCorrect ? 'correct' : 'incorrect')

  const correctnessIcon =
    showAnswersCorrectness &&
    (isCorrect ? <CheckIcon sx={iconStyles} /> : <CloseIcon sx={iconStyles} />)

  const shouldShowCorrectAnswers = showCorrectAnswers && !isOpenAnswer
  const correctAnswers = shouldShowCorrectAnswers && (
    <Box sx={styles.correctAnswers.root}>
      <Typography sx={styles.correctAnswers.title}>
        {t('myResourcesPage.correctAnswers')}
      </Typography>
      <Box sx={styles.correctAnswers.list}>
        {question.answers
          .filter((item) => item.isCorrect)
          .map((item) => (
            <Answer
              checked
              isCorrect={item.isCorrect}
              isEditable={false}
              key={item.text}
              label={item.text}
              showCorrectness
              text={item.text}
              type={question.type}
            />
          ))}
      </Box>
    </Box>
  )

  const answersList = question.answers.map((answer) => {
    const isChecked = isMultipleChoice
      ? value?.includes(answer.text)
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
        showCorrectness={showAnswersCorrectness}
        text={answer.text}
        type={question.type}
      />
    )
  })

  const answersContent = isMultipleChoice ? (
    <FormGroup sx={styles.answersContainer}>{answersList}</FormGroup>
  ) : isSingleChoice ? (
    <RadioGroup sx={styles.answersContainer}>{answersList}</RadioGroup>
  ) : (
    <Answer
      isCorrect
      isEditable={isEditable}
      label={question.text}
      onTextInputChange={handleInputChange}
      showCorrectness={showAnswersCorrectness}
      text={question.text}
      type={question.type}
      value={value as string}
    />
  )

  const pointsBlock = showPoints && (
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
      {answersContent}

      {correctAnswers}
    </ContainerComponent>
  )
}

export default QuizQuestion
