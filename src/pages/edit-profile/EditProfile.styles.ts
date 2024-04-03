import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  sectionsWrapper: {
    pr: { lg: '156px' },
    pl: { lg: '156px' }
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    typography: TypographyVariantEnum.H4
  },
  description: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'basic.gray'
  },
  line: {
    m: '16px 0'
  },
  backBtn: {
    padding: '10px'
  },
  sidebarMenu: {
    width: '30%',
    pr: { lg: '96px' }
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiButtonBase-root:hover': {
      backgroundColor: palette.basic.grey,
      '& .MuiTypography-body1': {
        color: palette.basic.black,
        fontWeight: '600'
      },
      '& .MuiListItemIcon-root svg': {
        color: palette.basic.black
      }
    }
  },
  mainContent: {
    width: '65%'
  }
}
