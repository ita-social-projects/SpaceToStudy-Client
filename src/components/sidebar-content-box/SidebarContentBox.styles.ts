import { TypographyVariantEnum } from '~/types'

export const styles = {
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    mb: '16px',
    pl: '16px'
  },
  textWithIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    text: {
      color: 'primary.800'
    },
    '& svg': {
      width: '20px',
      height: '20px'
    }
  },
  noContent: {
    typography: TypographyVariantEnum.Subtitle2,
    textAlign: 'center'
  },
  button: {
    color: 'primary.600'
  },
  text: {
    typography: TypographyVariantEnum.Subtitle2
  }
}
