const toggleButtonStyle = {
  borderColor: 'primary.200',
  '&.Mui-selected': {
    borderColor: 'primary.900',
    transition: '.16s ease',
    backgroundColor: 'transparent'
  }
}
export const styles = {
  root: { minWidth: '110px' },
  icon: {
    fontSize: '24px',
    color: 'primary.900'
  },
  gridButton: toggleButtonStyle,
  inlineButton: { ...toggleButtonStyle, marginRight: '8px' }
}
