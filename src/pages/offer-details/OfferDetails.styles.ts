import { MultiAccordionWithTitleSx } from '~/types'

const border = {
  boxShadow: 'none',
  border: '1px solid',
  borderColor: 'primary.100'
}

const faqAccordion: MultiAccordionWithTitleSx = {
  root: { width: '100%' },
  title: {
    color: 'primary.700',
    m: { xs: '16px 20px 10px', md: '35px 60px 30px 0' },
    typography: { xs: 'h6', md: 'h5' }
  },
  icon: { color: 'primary.500', fontSize: '13px' },
  withIcon: {
    accordion: {
      borderWidth: '1px',
      borderColor: 'primary.100',
      borderStyle: 'solid',
      borderRadius: '6px',
      '&:last-child': { mb: 0 },
      '&::before': { display: 'none' },
      m: { xs: '10px 0' },
      mb: '16px',
      p: { xs: 0, md: '12px 35px 12px' }
    },
    summary: {
      display: 'flex',
      flexDirection: { md: 'row-reverse', xs: 'row' },
      alignItems: 'center',
      '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
      },
      mb: 0,
      pl: 0
    },
    titleActive: {
      ml: '13px',
      color: 'primary.500'
    },
    titleInactive: {
      ml: '13px',
      color: 'primary.700'
    },
    description: {
      ml: { xs: '0', md: '12px' },
      color: { xs: 'primary.600', md: 'primary.900' }
    }
  }
}

export const styles = {
  container: {
    gap: '20px'
  },
  wrapper: {
    ...border,
    p: { xs: '16px 20px', sm: '35px 60px' }
  },
  offerCard: {
    ...border,
    p: { sm: '20px 20px', md: '20px 30px' }
  },
  offerCardSquare: border,
  faqAccordion
}
