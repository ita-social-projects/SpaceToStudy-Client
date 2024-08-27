import { TypographyVariantEnum } from '~/types'
import palette from '~/styles/app-theme/app.pallete'

export const styles = {
  menuItem: {
    width: '200px',
    p: '16px',
    typography: TypographyVariantEnum.MidTitle
  },
  logoutIcon: {
    pr: '12px'
  },
  logoutItem: {
    borderTop: `1px solid ${palette.basic.lightGray}`
  }
}
