import { TypographyVariantEnum } from '~/types'

export const styles = {
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
  updateBtn: {
    padding: '10px'
  },
  mainContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px'
  },
  mainContent: {
    width: '65%'
  }
}
