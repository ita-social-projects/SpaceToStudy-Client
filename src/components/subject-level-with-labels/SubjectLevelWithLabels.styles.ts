import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    gap: '10px'
  },
  labels: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: '5px'
  },
  label: {
    typography: TypographyVariantEnum.Overline,
    fontSize: '10px',
    fontWeight: '400',
    color: 'primary.500',
    lineHeight: '26px',
    textTransform: 'uppercase'
  },
  chips: {
    flexDirection: 'column'
  }
}
