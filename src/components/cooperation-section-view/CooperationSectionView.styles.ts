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
    sx: { padding: 0, margin: 0 },
    disabled: true
  },
  descriptionInput: {
    sx: {
      m: '0 0 0 45px'
    },
    disableUnderline: true
  },
  showBlock: {
    m: 0,
    p: '15px'
  }
}
