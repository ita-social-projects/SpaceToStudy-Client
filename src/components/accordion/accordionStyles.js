export const style = {
  accordion: {
    borderRadius: '6px',
    mb: { md:'16px',sm:'8px' },
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: 'primary.50',
      borderRadius: '6px'
    },
    '&::before': {
      display: 'none'
    }
  },
  heading: {
    fontSize: { md:'20px', sm:'13px' },
    lineHeight: { md:'28px', sm:'18px' },
    color: 'primary.900'
  },
  subHeading: {
    fontSize: { md:'14px', sm:'8px' },
    lineHeight: { md:'24px', sm:'12px' },
    color: 'white'
  },
  active: {
    backgroundColor: 'primary.800',
    borderRadius: '6px',
    boxShadow: 'shadows.primary',
    mb: { md:'16px',sm:'8px' },
    '& h6': {
      color: 'white'
    }
  }
}
