import { TypographyVariantEnum } from '~/types'

export const styles = {
  titleWithDescription: {
    title: { typography: TypographyVariantEnum.H5 },
    description: {
      typography: TypographyVariantEnum.Body1,
      color: 'primary.600'
    }
  },
  questionWrapper: {
    question: {
      px: '0'
    }
  }
}
