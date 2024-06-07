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
    m: '10px 0 20px',
    display: 'grid',
    gridTemplateColumns: {
      sm: 'repeat(5, minmax(0, 1fr))',
      md: 'repeat(7, minmax(0, 1fr))',
      lg: 'repeat(10, minmax(0, 1fr))'
    },
    gap: '10px'
  },

  saveButton: {
    gridColumn: { sm: 'span 3', md: 'span 3', lg: 'span 3' }
  },
  discardButton: {
    gridColumn: { sm: 'span 1', md: 'span 2', lg: 'span 2' }
  },
  deactivateButton: {
    mt: '20px',
    backgroundColor: 'error.700'
  }
}
