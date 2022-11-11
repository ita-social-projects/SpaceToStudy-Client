export const styles = {
  stableWidth: {
    width: '250px'
  },
  wrapper: {
    display: 'flex',
    marginTop: 2
  },
  icon: {
    justifyContent: 'center'
  },
  label: {
    margin: 0
  },
  subItem: {
    pl: 7,
    py: 0,
    mt: 1,
    '&::before': {
      content: '"•"',
      pr: 5
    }
  },
  active: {
    backgroundColor: 'primary.500',
    width: '2px',
    float: 'right',
    display: 'inline-block'
  },
  activeSubItem: {
    fontWeight: 600
  }
}
