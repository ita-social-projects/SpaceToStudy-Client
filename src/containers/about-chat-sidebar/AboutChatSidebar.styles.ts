import { TypographyVariantEnum } from '~/types'

export const styles = {
  wrapper: (isOpened: boolean) => ({
    display: isOpened ? 'flex' : 'none',
    backgroundColor: 'basic.white',
    flexDirection: 'column',
    p: '24px 8px',
    height: 'calc(100% - 48px)',
    maxWidth: '320px',
    '& .simplebar-track': {
      right: '-5px'
    }
  }),
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
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
    height: '124px'
  },
  userDescription: {
    textAlign: 'center',
    color: 'primary.800',
    typography: TypographyVariantEnum.Body2
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
