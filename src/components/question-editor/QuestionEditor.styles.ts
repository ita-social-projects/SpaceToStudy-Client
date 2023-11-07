import { commonShadow } from '~/styles/app-theme/custom-shadows'

const divider = {
  alignSelf: 'stretch',
  mt: '24px',
  borderColor: 'primary.200'
}

export const styles = {
  group: { width: '100%' },
  input: {
    style: { padding: 0 }
  },
  header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  moreIcon: {
    fontSize: '20px',
    color: 'primary'
  },
  editIconWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  editIcon: {
    fontSize: '18px',
    mr: '10px'
  },
  editorDivider: {
    ...divider,
    m: '8px 0 24px'
  },
  buttonsDivider: { ...divider },
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
    boxShadow: commonShadow,
    backgroundColor: 'basic.white'
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
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '32px',
    mt: '32px'
  },
  saveButton: { minWidth: '103px' }
}
