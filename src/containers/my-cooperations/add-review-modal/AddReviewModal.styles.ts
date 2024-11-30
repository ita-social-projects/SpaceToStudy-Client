import { TypographyVariantEnum } from '~/types'

export const styles = {
  title: {
    typography: TypographyVariantEnum.H5,
    marginBottom: '3px'
  },
  description: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.500',
    marginBottom: '15px'
  },
  root: { p: 5 },
  formWrapper: {
    m: '16px 0 24px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  buttonGroup: {
    display: 'flex',
    gap: 2,
    justifyContent: 'right'
  }
}
