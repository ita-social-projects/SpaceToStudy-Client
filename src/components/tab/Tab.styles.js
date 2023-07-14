import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  defaultTab: {
    px: { xs: '32px', sm: '44px' },
    cursor: 'pointer',
    color: 'primary.300',
    typography: 'subtitle2',
    borderRadius: 0
  },
  activeTab: {
    color: 'primary.600',
    borderBottom: '2px solid',
    pb: '14px',
    ...fadeAnimation
  }
}
