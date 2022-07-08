import { mainShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  feature: {
    px: '24px',
    overflow: 'auto'
  },
  image: {
    maxHeight: '470px',
    overflow: 'auto',
    mr: '24px'
  },  
  
  accordions: {
    root: { maxWidth: { md: '360px', sm: '229px' } },
    accordion: {
      borderRadius: '6px',
      mb: { md: '16px', sm: '8px' }
    },
    inactive: {
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: 'primary.50',
        borderRadius: '6px'
      },
      '&::before': {
        display: 'none'
      }
    },
    title: {
      fontSize: { md: '20px', sm: '13px' },
      lineHeight: { md: '28px', sm: '18px' },
      color: 'primary.900'
    },
    description: {
      fontSize: { md: '14px', sm: '8px' },
      lineHeight: { md: '24px', sm: '12px' },
      color: 'basic.white'
    },
    active: {
      backgroundColor: 'primary.800',
      boxShadow: mainShadow,
      '& h6': {
        color: 'basic.white'
      }
    }
  }
}
