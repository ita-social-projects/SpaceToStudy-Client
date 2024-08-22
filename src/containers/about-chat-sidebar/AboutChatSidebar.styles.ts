import { TypographyVariantEnum } from '~/types'

export const styles = {
  wrapper: {
    display: 'flex',
    backgroundColor: 'basic.white',
    flexDirection: 'column',
    p: '24px 8px',
    height: 'calc(100% - 48px)',
    '& .simplebar-track': {
      right: '-5px'
    }
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    py: '24px'
  },
  scrollBar: {
    height: 'calc(100% - 48px)'
  },
  header: {
    px: '24px',
    mb: '24px',
    columnGap: '20px',
    display: 'flex',
    alignItems: 'center'
  },
  goBackBtn: { p: '3px' },
  goBackIcon: { color: 'primary.800' },
  headerText: {
    color: 'primary.700'
  },
  headerIcon: {
    p: '8px',
    color: 'primary.800'
  },
  chatInfo: {
    display: 'flex',
    gap: '16px',
    flexDirection: 'column',
    alignItems: 'center',
    px: '16px'
  },
  userAvatar: {
    width: '124px',
    height: '124px',
    fontSize: '32px'
  },
  userDescription: {
    textAlign: 'center',
    color: 'primary.800',
    typography: TypographyVariantEnum.Body2
  },
  title: {
    typography: TypographyVariantEnum.H5
  },
  secondaryText: {
    typography: TypographyVariantEnum.Subtitle2
  }
}
