export const styles = {
  root: {
    // width: '1360px',
    // height: '88px',
    display: 'flex',
    position: 'sticky',
    padding: '20px',
    alignItems: 'center',
    gap: '50px',
    justifyContent: 'space-between'
  },
  mainBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px'
  },
  button: {
    whiteSpace: 'nowrap',
    width: '152px',
    height: '48px'
  },
  bookmarkButton: {
    color: 'blueGrey.500'
  },
  bookmarkButtonText: {
    color: 'blueGrey.500',
    display: 'flex',
    alignItems: 'center'
  },
  buttonsBlock: {
    display: 'flex'
  },
  subjectChip: {
    mr: '4px',
    backgroundColor: 'green.300',
    color: 'green.900'
  },
  levelChip: {
    backgroundColor: 'green.50',
    color: 'primary.700'
  },
  subjectChipLabel: {
    typography: 'overline',
    fontWeight: 500
  },
  levelChipLabel: {
    typography: 'overline'
  }
}
