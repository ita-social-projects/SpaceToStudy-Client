export const styles = {
  root: (open: boolean) => ({
    maxWidth: '240px',
    color: 'primary.700',
    whiteSpace: 'nowrap',
    py: { xs: '2px', sm: 0 },
    pr: { xs: 0, sm: open ? '40px' : 0 },
    width: open ? '100%' : 0,
    overflow: open ? 'visible' : 'hidden',
    opacity: open ? 1 : 0,
    transition: 'all 0.3s',
    transformOrigin: 'left'
  }),
  selectWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start'
  },
  content: {
    variant: 'body2'
  }
}
