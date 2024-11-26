import { TypographyVariantEnum } from '~/types'
import { rootContainer } from '~/containers/edit-profile/common.styles'

export const styles = {
  container: rootContainer,
  titleAndDescription: {
    typography: TypographyVariantEnum.H5
  },
  description: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.500',
    mb: '30px'
  },
  subtitle: {
    typography: TypographyVariantEnum.Body1,
    mb: '24px'
  },
  form: { display: 'flex', flexDirection: 'column', gap: '24px' },

  passwordButtonsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    gap: '10px',
    marginTop: '24px'
  },

  saveButton: {
    gridColumn: { sm: 'span 3', md: 'span 3', lg: 'span 3' },
    width: '193px'
  },
  discardButton: {
    gridColumn: { sm: 'span 1', md: 'span 2', lg: 'span 2' },
    width: '101px'
  },
  modalContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '700px',
    position: 'relative'
  }
}
