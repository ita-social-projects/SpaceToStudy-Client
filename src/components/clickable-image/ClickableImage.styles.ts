import { TypographyVariantEnum } from '~/types'

export const styles = {
  imageButton: {
    width: '88px',
    height: '88px',
    '& div': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
      borderRadius: '4px',
      backgroundColor: '#263238b3',
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
