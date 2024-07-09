import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    textAlign: 'center',
    minWidth: { xs: '280px', sm: '400px' }
  },
  img: { display: 'block', m: '40px auto 0' },
  titleWithDescription: {
    wrapper: {
      maxWidth: '800px',
      m: '5px auto 0'
    },
    description: {
      typography: TypographyVariantEnum.Subtitle1,
      color: palette.basic.darkGray,
      mb: '24px'
    }
  },
  button: {
    p: '10px 12px',
    color: palette.basic.lightBlue,
    backgroundColor: palette.basic.lightGray,
    '&:hover': {
      color: palette.basic.lightBlue,
      backgroundColor: palette.basic.lightGray
    }
  },
  menuItem: {
    minWidth: '200px',
    p: '10px 12px',
    color: palette.basic.lightBlue,
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  weightBox: {
    fontWeight: 500
  },
  logoBlock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: { xs: '225px', sm: '345px' },
    textAlign: 'center'
  }
}
