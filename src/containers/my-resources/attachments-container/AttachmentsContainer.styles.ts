import { roundedBorderTable } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'
import { TypographyVariantEnum } from '~/types'

const captionTitle = {
  color: 'primary.400',
  typography: TypographyVariantEnum.Caption
}

export const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    mb: '24px'
  },
  input: {
    flex: 1,
    border: '1px solid',
    borderColor: 'primary.500',
    borderRadius: '4px',
    maxWidth: '285px'
  },
  searchIcon: {
    color: 'primary.700'
  },
  addAttachmentBtn: {
    button: {
      backgroundColor: 'primary.900',
      typography: TypographyVariantEnum.Body1,
      fontWeight: '500',
      py: '12.5px'
    }
  },
  addAttachmentIcon: { ml: '5px', width: { xs: '18px', sm: '22px' } },
  table: roundedBorderTable,
  sizeTitle: captionTitle,
  dateTitle: captionTitle
}
