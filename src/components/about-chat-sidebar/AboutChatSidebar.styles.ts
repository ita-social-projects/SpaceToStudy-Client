import { TypographyVariantEnum } from '~/types'

export const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    p: '24px 8px',
    maxWidth: '320px',
    overflowY: 'scroll'
  },
  header: {
    text: {
      color: 'primary.700'
    },
    iconButton: {
      p: '8px',
      color: 'primary.800'
    },
    px: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  chatInfo: {
    avatar: {
      width: '124px',
      height: '124px'
    },
    description: {
      textAlign: 'center',
      color: 'primary.800',
      typography: TypographyVariantEnum.Body2
    },
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
    alignItems: 'center',
    px: '16px'
  },
  verticalGrid: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  title: {
    typography: TypographyVariantEnum.H5
  },
  notFound: {
    typography: TypographyVariantEnum.Subtitle2,
    textAlign: 'center'
  },
  secondaryText: {
    typography: TypographyVariantEnum.Subtitle2
  }
}
