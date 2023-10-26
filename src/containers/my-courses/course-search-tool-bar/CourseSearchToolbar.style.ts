import { TypographyVariantEnum } from '~/types'

export const styles = {
  container: {
    minHeight: '110px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  autocomplete: {
    width: '100%',
    maxWidth: { md: '370px' },
    mr: '30px',
    '& .MuiOutlinedInput-root': {
      padding: '5px 9px'
    },
    label: {
      lineHeight: '20px'
    },
    position: 'relative',
    '& .MuiFormHelperText-root': {
      fontSize: '14px',
      position: 'absolute',
      top: '-33px',
      left: '-14px'
    }
  },
  drowlevel: {
    width: '370px',
    position: 'relative'
  },
  drowstyle: {
    fontSize: '14px',
    position: 'absolute',
    top: '-33px',
    left: '-14px'
  },
  otherToolbar: {
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'backgroundColor;',
    boxShadow: 'none'
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
  TitleDescBox: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px'
  },
  searchBoxes: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '30px',
    marginBottom: '30px'
  }
}
