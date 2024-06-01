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
    gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
    gap: '10px'
  },

  saveButton: {
    gridColumn: 'span 3'
  },
  discardButton: {
    gridColumn: 'span 2'
  },
  deactivateButton: {
    mt: '20px',
    backgroundColor: 'error.700'
  }
}
