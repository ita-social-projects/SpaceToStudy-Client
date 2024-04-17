import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  inputWrapper: { p: '15px 20px 0px 20px' },
  input: {
    m: '0 auto',
    width: '100%',
    borderRadius: '6px',
    p: { xs: 0, sm: 0 },
    border: `1px solid ${palette.primary[400]}`,
    '& div': { pl: '10px' }
  },
  clearAll: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    columnGap: '3px',
    typography: TypographyVariantEnum.Subtitle2,
    m: '15px 20px 0 auto',
    p: 0,
    '&:hover': { backgroundColor: 'transparent' }
  },
  clearIcon: { height: '18px', width: '18px' },
  divider: {
    border: `1px solid ${palette.primary[200]}`,
    mt: '8px'
  }
}
