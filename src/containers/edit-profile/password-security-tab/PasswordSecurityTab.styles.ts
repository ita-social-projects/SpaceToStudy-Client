import { TypographyVariantEnum } from '~/types'
import { rootContainer } from '~/containers/edit-profile/common.styles'

export const styles = {
  container: rootContainer,
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
  form: { display: 'flex', flexDirection: 'column', gap: '8px' },
  passwordButtonsContainer: {
    m: '10px 0 20px'
  },
  discardButton: {
    ml: '10px'
  },
  deactivateButton: {
    mt: '20px',
    backgroundColor: 'error.700'
  }
}
