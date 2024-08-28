import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    width: '684px',
    maxWidth: '684px',
    height: '520px',
    paddingTop: '64px'
  },
  warningImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    mb: '20px'
  },
  warningImage: {
    color: 'error.700',
    fontSize: '2.5rem'
  },
  changeConfirmTitle: {
    textAlign: 'center',
    typography: TypographyVariantEnum.MidTitle,
    fontWeight: 600,
    pb: '20px'
  },
  changeConfirmResource: {
    textAlign: 'center',
    width: '55%',
    m: '0 auto',
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.600',
    pb: '15px'
  },
  changeConfirmDescription: {
    textAlign: 'center',
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.600',
    pb: '35px'
  },
  lessonsListContainer: {
    width: '55%',
    m: '0 auto',
    maxHeight: '190px',
    overflowY: 'auto',
    mb: '50px'
  },
  changeConfirmListTitles: {
    typography: TypographyVariantEnum.MidTitle,
    fontSize: '15px'
  },
  changeConfirmListItems: {
    pb: '30px'
  },
  changeConfirmListsubTitle: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.600'
  },
  changeConfirmButtonsContainer: {
    width: '78%',
    gap: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  changeConfirmResourceData: {
    fontWeight: '600',
    display: 'inline'
  }
}
