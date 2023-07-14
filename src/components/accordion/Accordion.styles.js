import {
  commonHoverShadow,
  commonShadow,
  mainShadow
} from '~/styles/app-theme/custom-shadows'

const noIconTitleStyles = {
  fontSize: { typography: { xs: 'body2', md: 'h6', sm: 'body2' } },
  lineHeight: { md: '28px', sm: '18px' },
  color: 'primary.900',
  typography: { xs: 'subtitle2', md: 'h6' }
}

const withIconTitleStyles = { color: 'primary.900' }

export const styles = {
  noIcon: {
    root: { maxWidth: { lg: '540px', md: '360px', sm: '229px' } },
    accordion: {
      borderRadius: '6px',
      mb: { md: '16px', sm: '8px' }
    },
    inactive: {
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: 'primary.50'
      },
      '&::before': {
        display: 'none'
      }
    },
    titleActive: noIconTitleStyles,
    titleInactive: noIconTitleStyles,
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
  },
  withIcon: {
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
    titleActive: withIconTitleStyles,
    titleInactive: withIconTitleStyles,
    details: { p: { xs: '0 16px', sm: '0 32px' } },
    description: {
      pb: '24px',
      color: 'primary.900',
      typography: 'body2',
      fontWeight: 400
    },
    active: {
      boxShadow: commonShadow,
      backgroundColor: 'basic.white',
      '& h6': { color: 'primary.900' },
      '&:hover': { boxShadow: commonHoverShadow }
    }
  }
}
