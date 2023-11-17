import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Typography,
  FormGroup,
  Checkbox,
  Radio,
  FormControlLabel,
  RadioGroup,
  SxProps
} from '@mui/material'
import { questionType } from '~/components/question-editor/QuestionEditor.constants'
import AppCard from '~/components/app-card/AppCard'

import { Question } from '~/types'
import { styles } from './QuizQuestion.styles'

interface QuizQuestionProps {
  question: Question
  index: number
  useAppCard?: boolean
  sx: { root: SxProps }
}

const QuizQuestion: FC<QuizQuestionProps> = ({
  question,
  index,
  useAppCard = false,
  sx
}) => {
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

  const ContainerComponent = useAppCard ? AppCard : Box

  return (
    <ContainerComponent sx={sx.root}>
      <Typography sx={styles.type}>
        {t(`questionPage.questionType.${question.type}`)}
      </Typography>

      <Box sx={styles.titleContainer}>
        <Typography sx={styles.title}>{index + 1}.</Typography>
        <Typography sx={styles.title}>{question.text}</Typography>
      </Box>

      {isMultipleChoice && <FormGroup>{answersList}</FormGroup>}
      {isSingleChoice && <RadioGroup>{answersList}</RadioGroup>}
    </ContainerComponent>
  )
}

export default QuizQuestion
