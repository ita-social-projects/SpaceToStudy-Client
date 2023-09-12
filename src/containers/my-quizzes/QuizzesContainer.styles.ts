import { TypographyVariantEnum } from '~/types'

const captionTitle = {
  color: 'primary.400',
  typography: TypographyVariantEnum.Caption
}

export const styles = {
  quizTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
    cursor: 'pointer'
  },
  quizIcon: {
    width: '24px',
    height: '24px',
    color: 'primary.900'
  },
  quizTitle: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.900'
  },
  amountQuestions: captionTitle,
  date: captionTitle
}
