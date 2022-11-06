export const styles = {
  stableWidth: {
    width: '220px'
  },
  listItem: {
    marginTop: 2,
    flexGrow: 0
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
    fontWeight: 600
  }
}
