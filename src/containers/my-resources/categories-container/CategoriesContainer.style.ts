import { TypographyVariantEnum } from '~/types'

export const styles = {
  title: {
    typography: TypographyVariantEnum.Subtitle2,
    color: 'primary.900'
  },
  date: {
    color: 'primary.400',
    typography: TypographyVariantEnum.Caption
  },
  addIcon: { ml: '5px', width: { xs: '18px', sm: '22px' } },
  table: {
    '& td,th': {
      '&:first-of-type': { maxWidth: { xs: '80%', sm: '50%' }, width: '100%' }
    }
  }
}
