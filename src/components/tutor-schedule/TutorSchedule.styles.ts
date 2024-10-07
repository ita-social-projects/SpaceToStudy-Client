import { TypographyVariantEnum } from '~/types'

export const styles = {
  generalContainer: {
    maxWidth: '500px',
    minHeight: '500px',
    width: '100%',
    m: { xs: '87px auto 0px', md: '87px 0px 0px' }
  },

  cardWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: '20px', md: '35px' },
    mt: '25px'
  },

  textContainer: {
    ml: { xs: '20px', sm: '45px' }
  },
  sectionTitle: {
    typography: TypographyVariantEnum.H5,
    color: 'basic.lightBlue'
  },

  sectionSubtitle: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'basic.blueGray'
  },

  btn: {
    color: 'basic.darkGrey',
    typography: TypographyVariantEnum.Body1,
    textDecoration: 'underline',
    display: 'block',
    m: 'auto',
    mt: { xs: '20px', md: '35px' }
  }
}
