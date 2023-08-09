import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: { p: '34px' },
  textWithIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    mb: '15px',
    '& svg': {
      width: '20px',
      height: '20px'
    }
  },
  text: {
    color: 'primary.800',
    typography: TypographyVariantEnum.Subtitle2
  }
}
