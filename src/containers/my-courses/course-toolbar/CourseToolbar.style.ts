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
    mr: '30px',
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    },
    position: 'relative'
  },
  levelSelect: {
    width: { md: '370px', xs: '100%' }
  },
  levelHelperText: {
    ...commonStyle
  },
  otherToolbar: {
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'backgroundColor',
    boxShadow: 'none',
    mb: 0
  },
  menuProps: {
    PaperProps: {
      style: {
        maxHeight: '224px',
        width: '250px'
      }
    }
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
  inputColor: (error: string) => ({
    color: error ? 'red' : 'basic.bismark'
  }),
  searchBoxes: {
    width: '100%',
    display: 'flex',
    flexDirection: { md: 'row', xs: 'column' },
    justifyContent: { md: 'space-between', xs: 'center' },
    gap: { md: '30px', sm: '20px', xs: '15px' }
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
    my: '32px'
  }
}
