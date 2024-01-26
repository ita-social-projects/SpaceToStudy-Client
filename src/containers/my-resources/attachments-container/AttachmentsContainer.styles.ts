import palette from '~/styles/app-theme/app.pallete'
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
      typography: {
        xs: TypographyVariantEnum.Subtitle2,
        md: TypographyVariantEnum.Body1
      },
      fontWeight: { md: 500 },
      py: '12px'
    }
  },
  categoryChip: {
    backgroundColor: 'inherit',
    borderRadius: '50px',
    '& .MuiChip-label': { p: '0px 8px' },
    border: `2px solid ${palette.basic.turquoiseDark}`
  },
  categoryChipLabel: {
    fontWeight: 500,
    typography: TypographyVariantEnum.Caption,
    color: 'basic.turquoiseDark'
  },
  addCategoryBtn: {
    color: 'primary.400',
    typography: TypographyVariantEnum.Subtitle2,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    visibility: 'hidden',
    '&:hover': {
      cursor: 'pointer',
      color: 'primary.700'
    }
  },
  addAttachmentIcon: { ml: '5px', width: { xs: '18px', sm: '22px' } },
  table: roundedBorderTable,
  sizeTitle: captionTitle,
  dateTitle: captionTitle
}
