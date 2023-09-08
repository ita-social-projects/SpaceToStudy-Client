import { commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    display: 'flex',
    padding: '16px 24px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    borderRadius: '6px',
    boxShadow: commonShadow
  },
  questionHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  },
  group: {
    width: '100%'
  },
  options: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  divider: {
    alignSelf: 'stretch',
    mb: '24px'
  },
  inputItem: {
    color: 'basic.black',
    width: '100%',
    mb: '8px',
    '.MuiFormControlLabel-label': {
      width: '100%'
    }
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
  })
}
