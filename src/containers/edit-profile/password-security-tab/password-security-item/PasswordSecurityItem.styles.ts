import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    m: '20px 0'
  },
  title: {
    typography: TypographyVariantEnum.Button
  },
  description: {
    typography: TypographyVariantEnum.Body2,
    color: 'primary.500'
  },
  titlesAndButtonContainer: {
    p: '20px 0'
  }
}
