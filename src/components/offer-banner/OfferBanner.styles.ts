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
    padding: '20px',
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
    gap: '16px'
  },
  button: {
    whiteSpace: 'nowrap',
    padding: '14.5px 30px',
    width: 'auto',
    lineHeight: '18.96px'
  },
  bookmarkButton: {
    color: 'primary.500',
    padding: '12px 30px',
    marginLeft: '16px'
  },
  bookmarkButtonText: {
    color: 'primary.500',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '8px'
  },
  buttonsBlock: {
    display: 'flex'
  },
  chipsContainer: {
    marginLeft: '12px'
  }
}
