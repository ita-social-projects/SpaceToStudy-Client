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
    boxShadow: commonHoverShadow
  },
  userInfo: {
    root: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    name: {
      typography: 'h6',
      padding: '12px'
    }
  },
  mainBlock: {
    display: 'flex',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    gap: '10px'
  },
  button: {
    whiteSpace: 'nowrap'
  },
  bookmarkButton: {
    color: 'primary.500'
  },
  bookmarkButtonText: {
    color: 'primary.500',
    display: 'flex',
    alignItems: 'center'
  },
  buttonsBlock: {
    display: 'flex'
  }
}
