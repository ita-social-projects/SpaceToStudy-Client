import { TypographyVariantEnum } from '~/types'
import {
  AnswerCorrectnessStatus,
  AnswerStatusEnum
} from '~/containers/quiz/question-answer/Answer.types'

export const styles = {
  root: {
    display: 'block',
    p: '20px 30px'
  },
  type: {
    typography: TypographyVariantEnum.Caption,
    color: 'primary.600',
    mb: '8px'
  },
  titleContainer: {
    display: 'flex',
    columnGap: '8px',
    mb: '16px',
    alignItems: 'center'
  },
  typeContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    typography: TypographyVariantEnum.Button,
    minWidth: '20px'
  },
  correctAnswers: {
    root: { mt: '20px' },
    title: {
      typography: TypographyVariantEnum.Caption,
      fontWeight: '600',
      color: 'primary.600',
      mb: '10px'
    },
    list: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  },
  answersContainer: {
    gap: '8px'
  },
  icon: (state?: AnswerCorrectnessStatus) => ({
    color: state === AnswerStatusEnum.Correct ? 'success.main' : 'error.main'
  })
}
