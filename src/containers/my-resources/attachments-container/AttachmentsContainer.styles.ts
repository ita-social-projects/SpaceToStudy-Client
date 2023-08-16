import { TypographyVariantEnum } from '~/types'
import { roundedBorderTable } from '~/containers/my-cooperations/cooperations-container/CooperationContainer.styles'

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
  addButton: {
    py: '19px',
    px: '40px'
  },
  newAttachmentIcon: {
    fontSize: '25px',
    marginLeft: '13px',
    fontWeight: '400'
  },
  table: roundedBorderTable,
  sizeTitle: captionTitle,
  dateTitle: captionTitle
}
