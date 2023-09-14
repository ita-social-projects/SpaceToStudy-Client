import { commonShadow } from '~/styles/app-theme/custom-shadows'
import { TypographyVariantEnum } from '~/types'

export const styles = {
  root: {},
  group: {
    width: '100%'
  },
  input: {
    style: {
      padding: 0
    }
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
  titleLabel: {
    shrink: false,
    sx: { typography: TypographyVariantEnum.H5, top: -14 }
  },
  labelCategory: {
    color: 'primary.600',
    maxWidth: '464px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  mainDivider: {
    m: '32px 0 24px'
  },
  editorDivider: {
    alignSelf: 'stretch',
    m: '8px 0 24px'
  },
  inputItem: {
    color: 'basic.black',
    width: '100%',
    mb: '8px',
    '.MuiFormControlLabel-label': {
      width: '100%'
    }
  },
  editorBlock: {
    display: 'flex',
    padding: '16px 24px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '6px',
    boxShadow: commonShadow
  },
  answer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  iconWrapper: {
    display: 'flex',
    padding: '8px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    backgroundColor: 'basic.grey'
  },
  selectContainer: {
    '.MuiOutlinedInput-notchedOutline': { border: 0 }
  },
  addRadio: (isEmptyAnswer: boolean) => ({
    display: 'flex',
    alignItems: 'center',
    color: 'primary.600',
    cursor: isEmptyAnswer ? 'auto' : 'pointer',
    '& label': {
      mr: '8px'
    }
  }),
  addIcon: (isEmptyAnswer: boolean) => ({
    color: isEmptyAnswer ? 'primary.300' : 'primary.700'
  }),
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '32px',
    mt: '32px'
  }
}
