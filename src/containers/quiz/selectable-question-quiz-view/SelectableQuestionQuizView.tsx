import { ChangeEvent, FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'

import {
  Question,
  ButtonVariantEnum,
  SizeEnum,
  UseFormEventHandler
} from '~/types'
import { styles } from '~/containers/quiz/selectable-question-quiz-view/SelectableQuestion.styles'
import { SxProps } from '@mui/material'
import QuizQuestion from '~/containers/quiz/quiz-question/Question'
import { getQuestionStatus } from '../quiz-question/Question.constants'
import { spliceSx } from '~/utils/helper-functions'

interface SelectableQuestionQuizViewProps {
  questions: Question[]
  handleInputChange: UseFormEventHandler<
    Record<string, string | string[]>,
    ChangeEvent<HTMLInputElement>
  >
  handleNonInputValueChange: (key: string) => (value: string | string[]) => void
  answers: Record<string, string | string[]>
  isEditable?: boolean
  showCorrectAnswers?: boolean
  showPoints?: boolean
  showAnswersCorrectness?: boolean
  sx?: { root?: SxProps; question?: SxProps }
}

const SelectableQuestionQuizView: FC<SelectableQuestionQuizViewProps> = ({
  questions,
  handleInputChange,
  handleNonInputValueChange,
  answers,
  showCorrectAnswers = false,
  showPoints = false,
  showAnswersCorrectness = false,
  sx,
  ...props
}) => {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const isSingleQuestion = questions.length === 1
  const isFirstQuestion = selectedIndex === 0
  const isLastQuestion = selectedIndex === questions.length - 1

  const questionsNumberList = questions.map((item, index) => {
    const answer = answers[item._id]

    const state = getQuestionStatus({
      question: item,
      answer,
      showAnswersCorrectness
    })

    return (
      <Box
        key={item._id}
        onClick={() => setSelectedIndex(index)}
        sx={styles.root({
          isSelected: selectedIndex === index,
          status: state
        })}
      >
        <Box sx={styles.statusLine(state)} />
        <Typography sx={styles.text}>{index + 1}</Typography>
      </Box>
    )
  })

  const question = questions[selectedIndex]

  const onNext = () => !isLastQuestion && setSelectedIndex(selectedIndex + 1)

  const onBack = () => !isFirstQuestion && setSelectedIndex(selectedIndex - 1)

  return (
    <Box sx={sx?.root}>
      <Box sx={styles.selectableList}>{questionsNumberList}</Box>

      <QuizQuestion
        handleInputChange={handleInputChange(question._id)}
        handleNonInputValueChange={handleNonInputValueChange(question._id)}
        index={selectedIndex}
        key={question._id}
        question={question}
        showAnswersCorrectness={showAnswersCorrectness}
        showCorrectAnswers={showCorrectAnswers}
        showPoints={showPoints}
        sx={spliceSx(styles.quizQuestion, sx?.question)}
        useAppCard
        value={answers[question._id]}
        {...props}
      />
      {!isSingleQuestion && (
        <Box sx={styles.buttons}>
          <AppButton
            disabled={isFirstQuestion}
            onClick={onBack}
            size={SizeEnum.Large}
            variant={ButtonVariantEnum.Tonal}
          >
            <ArrowBackIcon fontSize={SizeEnum.Medium} sx={styles.backIcon} />
            {t('common.back')}
          </AppButton>
          <AppButton
            disabled={isLastQuestion}
            onClick={onNext}
            size={SizeEnum.Large}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.next')}
            <ArrowForward fontSize={SizeEnum.Medium} sx={styles.nextIcon} />
          </AppButton>
        </Box>
      )}
    </Box>
  )
}

export default SelectableQuestionQuizView
