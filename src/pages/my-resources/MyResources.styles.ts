import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  title: {
    typography: TypographyVariantEnum.H4,
    mb: '40px'
  },
  divider: {
    '& > button:last-child': {
      position: 'relative'
    },
    '& > button:last-child:before': {
      content: '" "',
      position: 'absolute',
      height: '32px',
      left: '0',
      borderLeft: `1px solid ${palette.primary[100]}`
    }
  }
}
