import { TypographyVariantEnum } from '~/types'
import { commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '630px',
    width: '100%',
    boxSizing: 'border-box',
    p: '20px 40px',
    backgroundColor: 'basic.white',
    borderRadius: '4px',
    boxShadow: commonShadow
  },
  titleAndDescription: {
    title: {
      typography: TypographyVariantEnum.H6
    },
    description: {
      typography: TypographyVariantEnum.Body2,
      color: 'primary.500',
      mb: '30px'
    }
  },
  subtitle: {
    typography: TypographyVariantEnum.Body1,
    mb: '15px'
  },
  passwordButtonsContainer: {
    mt: '10px',
    mb: '20px'
  },
  discardButton: {
    ml: '10px'
  },
  deactivateButton: {
    mt: '20px',
    backgroundColor: 'error.700'
  }
}
