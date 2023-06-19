import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    columnGap: '4px',
    borderRadius: '5px'
  },
  starMobile: {
    color: 'basic.yellow',
    height: '18px'
  },
  number: { display: 'flex', alignItems: 'center' },
  rating: {
    typography: TypographyVariantEnum.H6
  },
  reviews: {
    typography: TypographyVariantEnum.Caption
  }
}
