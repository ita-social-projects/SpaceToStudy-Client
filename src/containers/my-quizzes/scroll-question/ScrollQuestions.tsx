import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
  Checkbox,
  Radio,
  FormGroup,
  RadioGroup,
  FormControlLabel
} from '@mui/material'
import { questionType } from '~/components/question-editor/QuestionEditor.constants'

import { QuizQuestionProps } from '~/types'
import { styles } from '~/containers/my-quizzes/scroll-question/ScrollQuestions.styles'

const QuizQuestion: FC<QuizQuestionProps> = ({ question, index }) => {
  const { t } = useTranslation()
  const { isMultipleChoice, isSingleChoice } = questionType(question.type)

  const answersList = question.answers.map((answer) => (
    <FormControlLabel
      control={isMultipleChoice ? <Checkbox /> : <Radio />}
      key={answer.text}
      label={answer.text}
      value={answer.text}
    />
  ))

  return (
    <Box sx={styles.root}>
      <Typography sx={styles.type}>
        {t(`questionPage.questionType.${question.type}`)}
      </Typography>
      <Box sx={styles.titleContainer}>
        <Typography sx={styles.title}>{index + 1}.</Typography>
        <Typography sx={styles.title}>{question.text}</Typography>
      </Box>
      {isMultipleChoice && <FormGroup>{answersList}</FormGroup>}
      {isSingleChoice && <RadioGroup>{answersList}</RadioGroup>}
    </Box>
  )
}

export default QuizQuestion
