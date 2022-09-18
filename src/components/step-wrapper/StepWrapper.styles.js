import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  root: {
    my: 6
  },
  defaultTab: {
    display: 'flex',
    justifyContent: 'center',
    width: '107px',
    borderBottom: '1px solid',
    borderColor: 'primary.500',
    cursor: 'pointer'
  },
  activeTab: {
    color: 'text',
    fontWeight: 600,
    borderBottom: '3px solid',
    pb: '14px',
    ...fadeAnimation
  },
  steps: {
    display: 'flex',
    columnGap: '1px'
  },
  btnWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    mt: '10px'
  },
  btn: {
    padding: '10px 20px',
    display: 'flex',
    columnGap: 1
  }
}
