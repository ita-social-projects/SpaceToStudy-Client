export const styles = {
  title: {
    color: 'primary.700',
    typography: { xs: 'h6', sm: 'h5' },
    mb: '30px'
  },
  description: (minHeight: number) => ({
    minHeight: minHeight,
    whiteSpace: 'pre-line',
    typography: { xs: 'body2', sm: 'body1' },
    color: 'primary.900'
  }),
  showBtnText: {
    display: 'inline-block',
    mt: '10px',
    cursor: 'pointer',
    typography: { xs: 'subtitle2', sm: 'button' },
    color: 'primary.500'
  }
}
