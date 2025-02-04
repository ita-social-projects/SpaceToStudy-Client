import { TypographyVariantEnum } from '~/types'
import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  boldText: {
    fontWeight: 500
  },
  response: {
    paddingTop: '10px'
  },
  secondaryText: {
    typography: TypographyVariantEnum.Body2,
    color: palette.basic.bismark
  }
}
