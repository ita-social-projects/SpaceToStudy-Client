import { TypographyVariantEnum } from '~/types'

export const styles = {
  fileWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  file: {
    display: 'flex',
    padding: '12px 16px',
    alignItems: 'center',
    gap: '16px',
    alignSelf: 'stretch'
  },
  fileInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: '1 0 0'
  },
  fileDescription: {
    display: 'flex',
    '& p': {
      color: 'primary.500',
      typography: TypographyVariantEnum.Caption,
      '&:first-of-type': {
        '&::after': {
          content: '"●"',
          px: '6px'
        }
      }
    }
  },
  formatFrame: {
    display: 'flex',
    width: '24px',
    height: '24px',
    padding: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    backgroundColor: 'primary.800',
    '& p': {
      color: 'basic.white',
      typography: TypographyVariantEnum.Caption,
      fontWeight: '500'
    }
  },
  secondaryText: {
    typography: TypographyVariantEnum.Subtitle2
  }
}
