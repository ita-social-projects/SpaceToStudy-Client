import { fadeAnimation } from '~/styles/app-theme/custom-animations'

const activeTab = {
  color: 'primary.600',
  borderBottom: '2px solid',
  ...fadeAnimation
}

export const styles = {
  tab: (isActive: boolean) => ({
    px: { xs: '32px', sm: '44px' },
    pb: '14px',
    cursor: 'pointer',
    color: 'primary.300',
    typography: 'subtitle2',
    borderBottom: '2px solid transparent',
    borderRadius: 0,
    ...(isActive && activeTab)
  })
}
