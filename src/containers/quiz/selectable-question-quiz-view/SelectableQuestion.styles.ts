import { TypographyVariantEnum } from '~/types'
import {
  AnswerStatus,
  AnswerStatusEnum
} from '~/containers/quiz/question-answer/Answer.types'

export const styles = {
  questionButton: (
    isSelected: boolean,
    status: AnswerStatusEnum[keyof AnswerStatusEnum]
  ) => {
    const isCorrect = status === AnswerStatusEnum.Correct
    const isIncorrect = status === AnswerStatusEnum.Incorrect

    const incorrect = isIncorrect ? 'error.50' : '#DAEFF0'
    const specificColor = isCorrect ? 'success.50' : incorrect
    const bgcolor = isSelected ? specificColor : 'primary.50'

    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '79px',
      borderRadius: '2px',
      cursor: 'pointer',
      bgcolor
    }
  },
  quizQuestion: {
    display: 'block',
    p: '20px 30px'
  },
  statusLine: (status: AnswerStatus) => {
    const isCorrect = status === AnswerStatusEnum.Correct
    const isIncorrect = status === AnswerStatusEnum.Incorrect
    const isAnswered = status === AnswerStatusEnum.Answered

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
  backIcon: {
    mr: '5px'
  },
  nextIcon: {
    ml: '5px'
  }
}
