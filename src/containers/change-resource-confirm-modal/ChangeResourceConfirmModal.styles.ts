import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    width: '684px',
    maxWidth: '684px',
    minHeight: '300px',
    p: '64px 40px 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  warningImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mb: '32px'
  },
  warningImage: {
    color: 'error.700',
    fontSize: '2.5rem'
  },
  title: {
    textAlign: 'center',
    typography: TypographyVariantEnum.MidTitle,
    fontWeight: 600,
    mb: '12px'
  },
  resource: {
    textAlign: 'center',
    width: '100%',
    m: '0 auto',
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.600',
    mb: '8px'
  },
  description: {
    textAlign: 'center',
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.600',
    mb: '32px'
  },
  lessonsListContainer: {
    width: '100%',
    m: '0 auto',
    maxHeight: '220px',
    overflowY: 'auto',
    mb: '38px'
  },
  listTitles: {
    typography: TypographyVariantEnum.MidTitle,
    fontSize: '15px'
  },
  listItems: {
    p: '16px 32px'
  },
  listSubtitle: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.600'
  },
  buttonsContainer: {
    width: '100%',
    gap: '16px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  button: {
    flexBasis: '96px'
  },
  resourceData: {
    fontWeight: '600',
    display: 'inline'
  }
}
