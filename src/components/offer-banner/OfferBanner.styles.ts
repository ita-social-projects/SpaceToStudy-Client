import { commonHoverShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  main: {
    position: 'sticky',
    top: '10px',
    zIndex: '2'
  },
  root: {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    padding: '10px',
    gap: '10px',
    boxSizing: 'border-box',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: commonHoverShadow,
    borderRadius: '6px',
    backgroundColor: 'white'
  },
  userInfo: {
    root: {
      display: 'flex',
      alignItems: 'center'
    },
    img: {
      width: '48px',
      height: '48px',
      border: '1px solid',
      borderRadius: '50%'
    },
    titleWithDescription: {
      title: {
        typography: 'h6',
        padding: '12px'
      }
    }
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
    whiteSpace: 'nowrap'
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
