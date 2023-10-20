import palette from '~/styles/app-theme/app.pallete'
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
  categoryChip: {
    backgroundColor: 'inherit',
    border: `2px solid ${palette.basic.turquoiseDark}`,
    borderRadius: '50px',
    '& .MuiChip-label': { p: '0px 8px' }
  },
  categoryChipLabel: {
    typography: TypographyVariantEnum.Caption,
    fontWeight: 500,
    color: 'basic.turquoiseDark'
  },
  amountQuestions: captionTitle,
  date: captionTitle
}
