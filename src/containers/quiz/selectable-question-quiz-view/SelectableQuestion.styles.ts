import { TypographyVariantEnum } from '~/types'

type QuestionStatus = 'correct' | 'incorrect' | 'unanswered' | 'answered'

interface RootParams {
  isSelected: boolean
  status: QuestionStatus
}

export const styles = {
  root: ({ isSelected, status }: RootParams) => {
    const isCorrect = status === 'correct'
    const isIncorrect = status === 'incorrect'

    const incorrect = isIncorrect ? 'error.50' : '#DAEFF0'
    const specificColor = isCorrect ? 'success.50' : incorrect
    const bgcolor = isSelected ? specificColor : 'primary.50'

    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '79px',
      bgcolor: bgcolor,
      borderRadius: '2px',
      cursor: 'pointer'
    }
  },
  quizQuestion: {
    display: 'block',
    p: '20px 30px'
  },
  statusLine: (status: QuestionStatus) => {
    const isCorrect = status === 'correct'
    const isIncorrect = status === 'incorrect'
    const isAnswered = status === 'answered'

    const withoutCorrectness = isAnswered ? '#73BBBD' : 'primary.200'
    const incorrect = isIncorrect ? 'error.600' : withoutCorrectness
    const bgcolor = isCorrect ? 'success.600' : incorrect

    return {
      height: '4px',
      width: '100%',
      borderTopLeftRadius: 'inherit',
      borderTopRightRadius: 'inherit',
      bgcolor
    }
  },
  text: {
    typography: TypographyVariantEnum.Subtitle2,
    my: '4px'
  },
  selectableList: {
    display: 'grid',
    gap: '16px',
    gridTemplateColumns: 'repeat(auto-fit, minmax(79px, 1fr))',
    my: '32px'
  },
  buttons: {
    display: 'flex',
    gap: '24px',
    justifyContent: { xs: 'center', sm: 'flex-end' },
    mt: '32px'
  },
  button: {
    py: '12px !important'
  },
  backIcon: {
    mr: '5px'
  },
  nextIcon: {
    ml: '5px'
  }
}
