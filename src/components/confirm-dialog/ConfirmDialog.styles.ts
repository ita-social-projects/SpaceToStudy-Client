import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    minWidth: { xs: '280px', sm: '400px' }
  },
  icon: {
    position: 'absolute',
    color: 'primary.600',
    right: '32px',
    top: '32px',
    p: 0
  },
  title: {
    color: 'primary.700',
    typography: TypographyVariantEnum.H5,
    p: '26px 0px 20px 30px'
  },
  content: {
    color: 'primary.600',
    p: '0 30px'
  },
  typographyContent: {
    typography: TypographyVariantEnum.Body1
  },
  actions: {
    p: '24px 30px'
  }
}
