const hideOnMobile = {
  display: { xs: 'none', md: 'inherit' },
  color: 'primary.900'
}
import { TypographyVariantEnum } from '~/types'

export const styles = {
  iconBox: {
    mr: { xs: '14px', sm: '20px', md: '32px' },
    display: 'flex',
    alignItems: 'center',
    '&>.MuiIconButton-root': {
      p: { sm: '12px', md: '7px', lg: '12px' }
    }
  },
  showOnlyOnMobile: { display: { md: 'none' }, color: 'primary.900' },
  loginButton: {
    ...hideOnMobile,
    ml: '12px'
  },
  studentIcons: {
    ...hideOnMobile
  },
  accountIcon: {
    ...hideOnMobile,
    ml: { sm: '12px', md: '12px', lg: '12px' },
    typography: TypographyVariantEnum.Button,
    cursor: 'pointer'
  }
}
