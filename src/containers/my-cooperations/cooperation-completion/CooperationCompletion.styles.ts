import { TypographyVariantEnum } from '~/types'

export const styles = {
  divider: {
    display: 'flex',
    borderBottom: '1px solid',
    borderColor: 'primary.100',
    mb: '32px'
  },
  title: {
    typography: TypographyVariantEnum.H6,
    color: 'primary.500'
  },
  closeBtn: {
    color: 'error.700',
    '&: hover': {
      backgroundColor: 'transparent',
      color: 'primary.500'
    }
  },
  dpopdown: {
    maxWidth: '216px'
  }
}
