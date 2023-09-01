import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    ...fadeAnimation
  },
  fileUpload: {
    root: {
      border: 'none'
    },
    button: {
      backgroundColor: 'primary.50'
    }
  }
}
