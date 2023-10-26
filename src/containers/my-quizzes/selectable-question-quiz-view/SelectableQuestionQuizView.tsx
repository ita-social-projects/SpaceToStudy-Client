import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box'
import AppButton from '~/components/app-button/AppButton'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'

import { Question, ButtonVariantEnum, SizeEnum } from '~/types'
import { styles } from '~/containers/my-quizzes/selectable-question-quiz-view/SelectableQuestion.styles'
import SelectableQuestion from '~/containers/my-quizzes/selectable-question/SelectableQuestion'

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

  const onNext = () => {
    if (!isLastQuestion) {
      setSelectedIndex(selectedIndex + 1)
    }
  }

  const onBack = () => {
    if (!isFirstQuestion) {
      setSelectedIndex(selectedIndex - 1)
    }
  }

  return (
    <Box>
      <Box sx={styles.selectableList}>{questionsNumberList}</Box>
      <SelectableQuestion
        question={questions[selectedIndex]}
        selectedIndex={selectedIndex}
      />
      {!isSingleQuestion && (
        <Box sx={styles.buttons}>
          {!isFirstQuestion && (
            <AppButton
              onClick={onBack}
              size={SizeEnum.ExtraLarge}
              sx={{ display: 'flex', flexDirection: 'space-between' }}
              variant={ButtonVariantEnum.Tonal}
            >
              <ArrowBackIcon fontSize={SizeEnum.Medium} sx={{ mr: '5px' }} />
              {t('common.back')}
            </AppButton>
          )}
          <AppButton
            disabled={isLastQuestion}
            onClick={onNext}
            size={SizeEnum.ExtraLarge}
            variant={ButtonVariantEnum.Tonal}
          >
            {t('common.next')}
            <ArrowForward fontSize={SizeEnum.Medium} sx={{ ml: '5px' }} />
          </AppButton>
        </Box>
      )}
    </Box>
  )
}

export default SelectableQuestionQuizView
