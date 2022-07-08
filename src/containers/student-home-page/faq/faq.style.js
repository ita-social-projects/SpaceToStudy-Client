import { studentShadow, studentHoverShadow } from '~/styles/app-theme/custom-shadows'

export const style = {
  root: { flexDirection: 'column' },
  titleBox: { pb: '50px' },
  title: { textAlign: 'center', color: 'textPrimary', pb: 1 },
  subtitle: { textAlign: 'center',color: 'primary.900' },
  
  accordions: {
    root: { maxWidth:  '928px' },
    accordion: {
      borderRadius: 0,
      mb: 2,
    },
    inactive: {
      borderRadius: 0,
      boxShadow: studentShadow,
      '&:hover': { boxShadow: studentHoverShadow },
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
      boxShadow: studentShadow,
      backgroundColor: 'basic.white',
      borderRadius: 0,
      '& h6': { color: 'primary.900' },
      '&:hover': { boxShadow: studentHoverShadow },
    }
  }
}
