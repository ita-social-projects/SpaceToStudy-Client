import { TypographyVariantEnum } from '~/types'

export const styles = {
  textWithIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    m: { xs: '18px 0 10px 24px', md: '30px 0 10px 24px' },
    '& svg': {
      width: '20px',
      height: '20px'
    }
  },
  text: {
    color: 'primary.800',
    typography: TypographyVariantEnum.Subtitle2
  },
  childrenWrapper: {
    p: '15px'
  }
}
