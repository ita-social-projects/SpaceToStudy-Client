export const styles = {
  number: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    borderColor: 'primary.700',
    borderRadius: '50%',
    border: '2px solid',
    textAlign: 'center',
    typography: { xs: 'caption', sm: 'subtitle2' },
    fontWeight: { xs: 500 },
    minWidth: { xs: '14px', sm: '18px' },
    height: { xs: '14px', sm: '18px' },
    lineHeight: { xs: '14px', sm: '20px' }
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    typography: { xs: 'midTitle', sm: 'h5' },
    pt: { xs: '5px', sm: 0 },
    width: '100%',
    whiteSpace: 'nowrap'
  },
  blockTitle: {
    title: {
      mb: '12px'
    }
  }
}
