import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  defaultTab: {
    px: '44px',
    borderBottom: '1px solid',
    cursor: 'pointer',
    color: 'primary.300'
  },
  activeTab: {
    color: 'primary.500',
    borderBottom: '3px solid',
    pb: '14px',
    ...fadeAnimation
  }
}
