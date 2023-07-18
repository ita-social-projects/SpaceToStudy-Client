import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: 'basic.white'
  },
  search: {
    p: { xs: '12px 12px 0', sm: '24px 24px 0' }
  },
  divider: {
    m: '0 24px',
    backgroundColor: 'primary.200'
  },
  information: {
    color: 'primary.700',
    backgroundColor: 'primary.100',
    p: '12px 16px',
    typography: TypographyVariantEnum.Subtitle2
  }
}
