import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  inputWrapper: { p: '15px 20px 0px 20px' },
  input: {
    m: '0 auto',
    width: '100%',
    height: '40px',
    p: { xs: 0, sm: 0 }
  },
  clearAll: {
    typography: TypographyVariantEnum.Subtitle2,
    m: '15px 20px 0 auto'
  },
  clearIcon: { height: '18px', width: '18px' },
  divider: {
    border: `1px solid ${palette.primary[200]}`,
    mt: '8px'
  }
}
