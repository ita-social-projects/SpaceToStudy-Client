import { TypographyVariantEnum } from '~/types'

export const styles = {
  title: {
    typography: TypographyVariantEnum.H6,
    color: 'primary.500',
    mt: '32px'
  },
  closeBtn: {
    color: 'error.700',
    minWidth: 'max-content',
    ml: '15px',
    '&: hover': {
      backgroundColor: 'transparent',
      color: 'primary.500'
    }
  },
  dropdown: {
    maxWidth: '216px',
    ml: '15px'
  }
}
