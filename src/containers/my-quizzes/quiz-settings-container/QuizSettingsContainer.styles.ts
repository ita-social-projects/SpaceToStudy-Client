import { TypographyVariantEnum } from '~/types'
export const styles = {
  topTitle: {
    mt: 1
  },
  title: {
    typography: TypographyVariantEnum.H6,
    color: 'basic.blueGray',
    mt: '40px'
  },
  subtitle: {
    typography: TypographyVariantEnum.Subtitle2
  },
  description: {
    typography: TypographyVariantEnum.Subtitle2,
    fontWeight: 400,
    color: 'basic.blueGray'
  },
  settingContainer: {
    mt: '24px',
    display: 'flex',
    justifyContent: 'space-between'
  }
}
