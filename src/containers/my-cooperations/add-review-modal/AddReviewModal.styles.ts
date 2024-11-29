import palette from '~/styles/app-theme/app.pallete'
import { PositionEnum, TypographyVariantEnum } from '~/types'

const { Subtitle1, Body2 } = TypographyVariantEnum

const titleWithDescription = {
  wrapper: { textAlign: PositionEnum.Left },
  title: { typography: Subtitle1 },
  description: { typography: Body2, color: palette.primary[500] }
}

export const styles = {
  root: { p: 5 },
  formWrapper: {
    m: '16px 0 24px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  },
  buttonGroup: {
    display: 'flex',
    gap: 2
  },
  titleWithDescription
}