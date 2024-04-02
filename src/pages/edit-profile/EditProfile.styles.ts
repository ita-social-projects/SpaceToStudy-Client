import { TypographyVariantEnum } from '~/types'

export const styles = {
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    typography: TypographyVariantEnum.H5
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
    width: '30%'
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  mainContent: {
    width: '65%',
    mr: '10%'
  }
}
