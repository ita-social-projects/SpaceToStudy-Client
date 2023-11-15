import { TypographyVariantEnum } from '~/types'

const iconContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '32px',
  height: '32px',
  mr: '20px'
}

export const styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  iconBox: {
    ...iconContainer,
    backgroundColor: 'basic.turquoise',
    borderRadius: '5px',
    color: 'basic.white',
    fontSize: '12px',
    typography: TypographyVariantEnum.Caption
  },
  svgBox: {
    ...iconContainer
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
        cursor: 'pointer'
      }
    }
  }
}
