import { commonShadow, commonHoverShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  root: { flexDirection: 'column' },
  
  accordions: {
    root: { maxWidth: '928px', mt: '18px' },
    accordion: { mb: 2 },
    inactive: {
      boxShadow: commonShadow,
      '&:hover': { boxShadow: commonHoverShadow },
      '&::before': { display: 'none' }
    },
    summary: {
      p: { xs: '0 16px', sm: '0 32px' },
      '& .MuiAccordionSummary-content': {
        m: '24px 0'
      }
    },
    title: { color: 'primary.900' },
    details: { p: { xs: '0 16px', sm: '0 32px' } },
    description: {
      pb: '24px',
      color: 'primary.900',
      typography: 'body2',
      fontWeight: 400,
    },
    active: {
      boxShadow: commonShadow,
      backgroundColor: 'basic.white',
      '& h6': { color: 'primary.900' },
      '&:hover': { boxShadow: commonHoverShadow },
    }
  }
}
