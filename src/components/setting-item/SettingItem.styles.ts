import { TypographyVariantEnum } from '~/types'
export const styles = {
  title: {
    typography: TypographyVariantEnum.Subtitle2
  },
  subtitle: {
    typography: TypographyVariantEnum.Subtitle2,
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
