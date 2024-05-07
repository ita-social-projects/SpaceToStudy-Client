import { commonShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    backgroundColor: 'basic.white',
    borderRadius: '6px',
    p: '24px',
    mb: '20px',
    boxShadow: commonShadow
  },
  input: {
    style: { padding: 0, margin: 0 },
    disabled: true
  },
  descriptionInput: {
    style: {
      marginTop: 0,
      marginLeft: '45px'
    },
    disableUnderline: true
  },
  showBlock: {
    m: 0,
    p: '15px'
  }
}
