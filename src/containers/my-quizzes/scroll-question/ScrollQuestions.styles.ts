import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    marginBottom: '32px'
  },
  type: {
    typography: TypographyVariantEnum.Caption,
    color: 'primary.600',
    mb: '8px'
  },
  titleContainer: {
    display: 'flex',
    columnGap: '5px',
    mb: '16px'
  },
  title: {
    typography: TypographyVariantEnum.Button,
    mt: '8px',
    minWidth: '20px'
  }
}
