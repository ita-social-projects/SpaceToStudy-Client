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
  addAttachmentBtn: { width: 'fit-content' },
  addAttachmentIcon: { ml: '5px', width: { xs: '18px', sm: '22px' } },
  table: {
    '& td,th': {
      '&:first-of-type': { maxWidth: '50%', width: '100%' }
    }
  },
  sizeTitle: captionTitle,
  dateTitle: captionTitle
}
