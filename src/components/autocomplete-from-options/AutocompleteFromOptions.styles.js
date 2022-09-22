import { scrollbar } from '~/styles/app-theme/custom-scrollbar'

export const styles = {
  form: {
    overflow: 'auto',
    pt: '10px',
    ...scrollbar
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  inputGroup: {
    flexGrow: '1'
  },
  btn: {
    bgcolor: 'primary.50'
  }
}
