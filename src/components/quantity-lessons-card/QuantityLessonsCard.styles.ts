import { TypographyVariantEnum } from '~/types'

export const styles = {
  cardContainer: {
    width: '100%',
    maxWidth: '640px',
    height: { xs: '450px', sm: '400px' },
    borderRadius: '8px',
    backgroundColor: 'basic.white',
    mt: '75px',
    p: '25px 20px 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column'
  },

  cardContainerTitle: {
    typography: TypographyVariantEnum.H5,
    color: 'basic.darkGray',
    mb: '5px'
  },

  cardContainerCaption: {
    typography: TypographyVariantEnum.Body2,
    color: 'basic.blueGray',
    mb: '15px'
  },

  select: {
    height: '40px',
    border: '1px solid',
    borderColor: 'basic.gray',
    '& .MuiSelect-select': {
      p: '8px 10px'
    }
  },

  selectAndButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    mb: 'auto',
    flexWrap: 'wrap',
    gap: '8px'
  },

  clearAllButton: {
    height: '40px',
    ml: 'auto',
    typography: TypographyVariantEnum.Body1,
    color: 'basic.darkGray'
  },

  selectedValue: {
    display: 'flex',
    gap: 1
  }
}
