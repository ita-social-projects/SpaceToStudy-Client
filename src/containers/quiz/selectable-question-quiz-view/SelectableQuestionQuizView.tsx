import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { SxProps } from '@mui/material/styles'

import Button from '~scss-components/button/Button'
import QuizQuestion from '~/containers/quiz/quiz-question/Question'

import { styles } from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestion.styles'
import { getQuestionStatus } from '~/containers/quiz/quiz-question/Question.constants'
import { spliceSx } from '~/utils/helper-functions'

import { Question, SizeEnum, UseFormEventHandler } from '~/types'

interface SelectableQuestionQuizViewProps {
  questions: Question[]
  handleInputChange: UseFormEventHandler<
    Record<string, string | string[]>,
    ChangeEvent<HTMLInputElement>
  >
  handleNonInputValueChange: (key: string) => (value: string | string[]) => void
  answers: Record<string, string | string[]>
  isEditable?: boolean
  shouldShowCorrectAnswers?: boolean
  shouldShowPoints?: boolean
  shouldShowAnswersCorrectness?: boolean
  sx?: { root?: SxProps; question?: SxProps }
}

const SelectableQuestionQuizView: FC<SelectableQuestionQuizViewProps> = ({
  questions,
  handleInputChange,
  handleNonInputValueChange,
  answers,
  shouldShowCorrectAnswers = false,
  shouldShowPoints = false,
  shouldShowAnswersCorrectness = false,
  isEditable = false,
  sx,
  ...props
}) => {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState(0)

  const isSingleQuestion = questions.length === 1
  const isFirstQuestion = selectedIndex === 0
  const isLastQuestion = selectedIndex === questions.length - 1

  const questionsNumberList = questions.map((item, index) => {
    const answer = answers[item._id]

    const isSelected = selectedIndex === index

    const status = getQuestionStatus({
      question: item,
      answer,
      shouldShowAnswersCorrectness
    })

    const questionButtonStyles = styles.questionButton(isSelected, status)

    const statusLineStyles = styles.statusLine(status)

    return (
      <Box
        key={item._id}
        onClick={() => setSelectedIndex(index)}
        sx={questionButtonStyles}
      >
        <Box sx={statusLineStyles} />
        <Typography sx={styles.text}>{index + 1}</Typography>
      </Box>
    )
  })

  const question = questions[selectedIndex]

  const onNext = () => !isLastQuestion && setSelectedIndex(selectedIndex + 1)

  const onBack = () => !isFirstQuestion && setSelectedIndex(selectedIndex - 1)

  const navigationArrows = !isSingleQuestion && (
    <Box sx={styles.buttons}>
      <Button
        disabled={isFirstQuestion}
        onClick={onBack}
        size='lg'
        startIcon={
          <ArrowBackIcon fontSize={SizeEnum.Medium} sx={styles.backIcon} />
        }
        variant='tonal'
      >
        {t('common.back')}
      </Button>
      <Button
        disabled={isLastQuestion}
        endIcon={
          <ArrowForward fontSize={SizeEnum.Medium} sx={styles.nextIcon} />
        }
        onClick={onNext}
        size='lg'
        variant='tonal'
      >
        {t('common.next')}
      </Button>
    </Box>
  )

  return (
    <Box sx={sx?.root}>
      <Box sx={styles.selectableList}>{questionsNumberList}</Box>
      <QuizQuestion
        handleInputChange={handleInputChange(question._id)}
        handleNonInputValueChange={handleNonInputValueChange(question._id)}
        index={selectedIndex}
        isEditable={isEditable}
        key={question._id}
        question={question}
        shouldShowAnswersCorrectness={shouldShowAnswersCorrectness}
        shouldShowCorrectAnswers={shouldShowCorrectAnswers}
        shouldShowPoints={shouldShowPoints}
        shouldUseAppCardWrapper
        sx={spliceSx(styles.quizQuestion, sx?.question)}
        value={answers[question._id]}
        {...props}
      />
      {navigationArrows}
    </Box>
  )
}

export default SelectableQuestionQuizView
