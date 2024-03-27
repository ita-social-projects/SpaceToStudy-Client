import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {},
  title: {
    typography: TypographyVariantEnum.H5
  },
  description: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'basic.gray'
  },
  subtitle: {
    typography: TypographyVariantEnum.Body1
  },
  saveButton: {
    marginTop: '20px'
  },
  deactivateButton: {
    backgroundColor: 'basic.carmenRed'
  }
}
