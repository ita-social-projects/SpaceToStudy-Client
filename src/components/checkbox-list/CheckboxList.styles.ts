export const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  title: {
    color: 'primary.700',
    mb: '15px'
  },
  checkbox: {
    '&.MuiCheckbox-root': {
      py: '6px'
    }
  },
  error: {
    color: 'error.500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    width: { xs: '230px' },
    m: '3px 14px',
    minHeight: '20px'
  }
}
