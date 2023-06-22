const column = {
  display: 'flex',
  flexDirection: 'column'
}

export const styles = {
  root: {
    maxWidth: { sm: '500px', md: '700px' },
    px: { sm: '16px', md: '32px' },
    color: 'primary.700',
    gap: '12px',
    boxSizing: 'border-box',
    ...column
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    mb: '12px',
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
    width: { xs: '18px', sm: '22px' }
  },
  description: {
    color: 'primary.500',
    typography: { xs: 'body2', sm: 'body1' }
  },
  currencyIcon: { width: '10px' },
  buttonBox: {
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: { xs: '16px', sm: '30px' },
    mt: { xs: '16px', sm: '24px' }
  },
  category: {
    mb: '12px'
  },
  inputs: {
    mb: '6px'
  },
  faqError: { minHeight: '20px', typography: 'caption', color: 'error.500' },
  faqButton: {
    width: 'fit-content',
    alignSelf: 'start'
  },
  faqInputsBlock: { display: 'flex', gap: '12px', alignItems: 'start' },
  faqInputs: { flex: 1 },
  submit: { minWidth: '166px' }
}
