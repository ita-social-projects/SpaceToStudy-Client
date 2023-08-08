import { TypographyVariantEnum } from '~/types'

const captionTitle = {
  color: 'primary.400',
  typography: TypographyVariantEnum.Caption
}

export const styles = {
  table: {
    '& td,th': {
      '&:first-of-type': {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px'
      },
      '&:last-of-type': {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px'
      }
    }
  },
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
