import { TypographyVariantEnum } from '~/types'

export const styles = {
  media: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  headerWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  verticalGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  button: {
    color: 'primary.600'
  },
  text: {
    typography: TypographyVariantEnum.Subtitle2
  }
}
