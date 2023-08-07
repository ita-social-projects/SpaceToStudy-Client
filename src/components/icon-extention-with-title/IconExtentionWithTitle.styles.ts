import { TypographyVariantEnum } from '~/types'
import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: palette.basic.turquoise,
    borderRadius: '5px',
    marginRight: '20px',
    color: palette.basic.white,
    fontSize: '12px',
    typography: TypographyVariantEnum.Caption
  },
  titleWithDescription: {
    title: {
      typography: TypographyVariantEnum.Subtitle2
    },
    description: {
      typography: TypographyVariantEnum.Caption,
      color: 'primary.500'
    }
  }
}
