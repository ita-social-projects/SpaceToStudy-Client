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
    fontSize: '16px',
    lineHeight: '24px',
    padding: '12px 20px',
    mt: '10px',
    width: '100%',
    bgcolor: 'basic.grey',
    display: 'flex',
    columnGap: '8px'
  }
}
