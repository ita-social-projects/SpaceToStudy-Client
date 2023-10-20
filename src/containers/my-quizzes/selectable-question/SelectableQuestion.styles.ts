import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'block',
    p: '20px 30px'
  },
  type: {
    typography: TypographyVariantEnum.Caption,
    color: 'primary.600'
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
