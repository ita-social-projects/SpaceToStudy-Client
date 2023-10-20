import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import RadioGroup from '@mui/material/RadioGroup'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'

import AppCard from '~/components/app-card/AppCard'

import { Question } from '~/types'
import { questionType } from '~/components/question-editor/QuestionEditor.constants'
import { styles } from '~/containers/my-quizzes/selectable-question/SelectableQuestion.styles'

interface SelectableQuestionProps {
  question: Question
  selectedIndex: number
}

const SelectableQuestion: FC<SelectableQuestionProps> = ({
  question,
  selectedIndex
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

  return (
    <AppCard sx={styles.root}>
      <Typography sx={styles.type}>
        {t(`questionPage.questionType.${question.type}`)}
      </Typography>

      <Box sx={styles.titleContainer}>
        <Typography sx={styles.title}>{selectedIndex + 1}.</Typography>
        <Typography sx={styles.title}>{question.text}</Typography>
      </Box>

      {isMultipleChoice && <FormGroup>{answersList}</FormGroup>}
      {isSingleChoice && <RadioGroup>{answersList}</RadioGroup>}
    </AppCard>
  )
}

export default SelectableQuestion
