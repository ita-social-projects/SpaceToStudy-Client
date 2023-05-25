export const styles = {
  root: (open: boolean) => ({
    maxWidth: '240px',
    color: 'primary.700',
    whiteSpace: 'nowrap',
    py: { xs: '2px', sm: 0 },
    pr: { xs: 0, sm: open ? '40px' : 0 },
    width: open ? '100%' : '0',
    overflow: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
    transition: 'all .3s',
    transformOrigin: 'left'
  }),
  switchWrapper: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  selectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  content: {
    variant: 'body2'
  },
  applyButton: {
    backgroundColor: 'primary.500',
    boxShadow: 'none',
    '&:hover': {
      boxShadow: 'none'
    }
  }
}
