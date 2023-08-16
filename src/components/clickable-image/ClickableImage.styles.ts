import { TypographyVariantEnum } from '~/types'

export const styles = {
  imageButton: {
    width: '88px',
    height: '88px',
    '& div': {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '4px',
      backgroundColor: 'imageOverlay',
      color: 'primary.50',
      typography: TypographyVariantEnum.H6
    }
  },
  image: {
    width: '88px',
    height: '88px',
    borderRadius: '4px',
    objectFit: 'cover'
  }
}
