import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    gap: '4px'
  },
  labels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: '5px'
  },
  label: {
    typography: TypographyVariantEnum.Overline,
    fontWeight: '300',
    color: 'primary.400',
    lineHeight: '25px'
  },
  chips: {
    flexDirection: 'column'
  }
}
