import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  iconBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '40px',
    height: '40px',
    backgroundColor: 'basic.turquoise',
    borderRadius: '5px',
    marginRight: '20px',
    color: 'basic.white',
    fontSize: '12px',
    typography: TypographyVariantEnum.Caption
  },
  titleWithDescription: {
    title: {
      typography: TypographyVariantEnum.Subtitle2
    },
    description: {
      typography: TypographyVariantEnum.Caption,
      color: 'primary.500',
      display: 'block',
      maxWidth: '490px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      '&:hover': {
        textDecoration: 'underline',
        color: 'primary.700',
        cursor: 'default'
      }
    }
  }
}
