import palette from '~/styles/app-theme/app.pallete'
import { TypographyVariantEnum } from '~/types'

const commonStyle = {
  fontSize: '14px',
  position: 'absolute',
  top: '-33px',
  left: '-14px'
}

export const styles = {
  container: {
    minHeight: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  autocomplete: {
    width: { md: '370px', xs: '100%' },
    mr: '20px',
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    },
    position: 'relative',
    flex: 1
  },
  autocompleteDropdownDivider: {
    m: '8px 0 10px 0',
    border: `1px solid ${palette.primary[100]}`
  },
  autocompleteDropdownTitle: {
    typography: TypographyVariantEnum.Caption,
    color: 'primary.300',
    px: '16px'
  },
  levelHelperText: {
    ...commonStyle
  },
  levelSelect: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    }
  },
  otherToolbar: {
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'backgroundColor',
    boxShadow: 'none',
    p: '25px 0px 0px',
    mb: 0
  },
  input: {
    style: {
      padding: 0
    }
  },
  descriptionLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.Body1, top: -21 }
  },
  titleInput: {
    disableUnderline: true,
    style: {
      fontSize: '35px',
      fontWeight: 500,
      maxHeight: '35px',
      marginTop: 0
    }
  },
  descriptionInput: {
    disableUnderline: true,
    style: { fontSize: '16px', maxHeight: '16px', marginTop: 0 }
  },
  titleLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.H4, top: -23 }
  },
  titleDescBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    mb: '30px',
    gap: '24px'
  },
  searchBoxes: {
    width: '100%',
    display: 'flex',
    flexDirection: { md: 'row', xs: 'column' },
    justifyContent: { md: 'space-between', xs: 'center' },
    gap: { md: '0px', sm: '20px', xs: '15px' }
  },
  categories: {
    color: 'basic.bismark'
  },
  weightBox: {
    fontWeight: 500
  },
  divider: {
    display: 'flex',
    borderBottom: '1px solid',
    borderColor: 'primary.100',
    mt: { sm: '32px', md: '10px' },
    mb: '32px'
  }
}
