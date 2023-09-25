import { TypographyVariantEnum } from '~/types'

export const styles = {
  title: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.900'
  },
  table: {
    '& td,th': {
      '&:first-of-type': { maxWidth: '50%', width: '100%' }
    }
  }
}
