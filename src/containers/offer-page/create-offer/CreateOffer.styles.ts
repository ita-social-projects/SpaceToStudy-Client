const column = {
  display: 'flex',
  flexDirection: 'column'
}

export const styles = {
  root: {
    maxWidth: { xs: '250px', sm: '450px', md: '650px' },
    px: { sm: '16px', md: '32px' },
    color: 'primary.700',
    gap: '12px',
    boxSizing: 'border-box',
    ...column
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    mb: '14px',
    gap: '10px',
    typography: { xs: 'midTitle', sm: 'h5' },
    pt: { xs: '5px', sm: 0 },
    width: '100%',
    whiteSpace: 'nowrap'
  },
  specialization: {
    ...column,
    pl: { sm: '32px' }
  },
  inputBlock: {
    ...column,
    gap: '12px'
  },
  icon: {
    width: { xs: '16px', sm: '20px' }
  },
  description: {
    typography: { xs: 'body2', sm: 'body1' }
  },
  currencyIcon: { width: '10px' },
  buttonBox: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: '16px', sm: '30px' },
    mt: { xs: '8px', sm: '16px' }
  },
  category: {
    mb: '12px'
  },
  inputs: {
    mb: '6px'
  }
}
