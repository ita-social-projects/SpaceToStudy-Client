import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AppButton from '~/components/app-button/AppButton'
import QuizQuestion from '~/containers/my-quizzes/quiz-question/QuizQuestion'

import { Question, ButtonVariantEnum, SizeEnum } from '~/types'
import { styles } from '~/containers/my-quizzes/selectable-question-quiz-view/SelectableQuestion.styles'

interface SelectableQuestionQuizViewProps {
  questions: Question[]
}

const SelectableQuestionQuizView: FC<SelectableQuestionQuizViewProps> = ({
  questions
}) => {
  const { t } = useTranslation()
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  const isSingleQuestion = questions.length === 1
  const isFirstQuestion = selectedIndex === 0
  const isLastQuestion = selectedIndex === questions.length - 1

  const questionsNumberList = questions.map((item, index) => {
    return (
      <Box
        key={item._id}
        onClick={() => setSelectedIndex(index)}
        sx={styles.root(index === selectedIndex)}
      >
        <Box sx={styles.statusLine} />
        <Typography sx={styles.text}>{index + 1}</Typography>
      </Box>
    )
  })

  const onNext = () => !isLastQuestion && setSelectedIndex(selectedIndex + 1)

  const onBack = () => !isFirstQuestion && setSelectedIndex(selectedIndex - 1)

  return (
    <Box>
      <Box sx={styles.selectableList}>{questionsNumberList}</Box>
      <QuizQuestion
        index={selectedIndex}
        question={questions[selectedIndex]}
        sx={styles.quizQuestion}
        useAppCard
      />
      {!isSingleQuestion && (
        <Box sx={styles.buttons}>
          <AppButton
            disabled={isFirstQuestion}
            onClick={onBack}
            size={SizeEnum.ExtraLarge}
            variant={ButtonVariantEnum.Tonal}
          >
            <ArrowBackIcon fontSize={SizeEnum.Medium} sx={styles.backIcon} />
            {t('common.back')}
          </AppButton>
          <AppButton
            disabled={isLastQuestion}
            onClick={onNext}
            size={SizeEnum.ExtraLarge}
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
