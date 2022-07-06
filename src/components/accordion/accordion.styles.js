import { mainShadow, secondShadow } from '~/styles/app-theme/custom-shadows'
export const guestStyle = {
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

export const faqStyle = {
  accordion: {
    borderRadius: 0,
    mb: 2,
  },
  inactive: {
    borderRadius: 0,
    boxShadow: 'none',
    '&:hover': { boxShadow: secondShadow },
    '&::before': { display: 'none' }
  },
  summary: { borderRadius: 0, p: '0 32px' },
  title: { color: 'primary.900' },
  details: { borderRadius: 0, p: '0 32px' },
  description: {
    pb: '24px',
    color: 'primary.900'
  },
  active: {
    backgroundColor: 'basic.white',
    borderRadius: 0,
    '& h6': { color: 'primary.900' },
    '&:hover': { boxShadow: secondShadow },
  }
}
