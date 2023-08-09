import { TypographyVariantEnum } from '~/types'

const sizeLimit = {
  width: '92%',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textAlign: 'start'
}

export const styles = {
  linkWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'stretch'
  },
  linkButton: {
    display: 'flex',
    padding: '12px 16px',
    alignItems: 'center',
    gap: '16px'
  },
  linkInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: '1',
    width: '75%'
  },
  link: {
    typography: TypographyVariantEnum.Caption,
    color: 'primary.500',
    textDecoration: 'underline',
    ...sizeLimit
  },
  formatFrame: {
    display: 'flex',
    width: '24px',
    height: '24px',
    padding: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    backgroundColor: 'primary.400'
  },
  linkIcon: {
    color: 'basic.white',
    width: '32px',
    height: '32px',
    transform: 'rotateZ(140deg)'
  },
  secondaryText: {
    typography: TypographyVariantEnum.Subtitle2,
    ...sizeLimit
  }
}
