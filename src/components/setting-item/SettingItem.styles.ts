import { TypographyVariantEnum } from '~/types'
export const styles = {
  title: {
    typography: TypographyVariantEnum.Subtitle1,
    fontWeight: 500
  },
  subtitle: {
    typography: TypographyVariantEnum.Subtitle1,
    fontWeight: 400,
    color: 'basic.blueGray'
  },
  settingContainer: {
    mt: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}
