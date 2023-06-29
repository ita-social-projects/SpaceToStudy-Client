import { chatShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  root: {
    display: 'flex',
    gap: '55px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '5px'
  },
  messageBox: {
    display: 'flex',
    gap: '20px',
    flex: '1'
  },
  icon: {
    width: '22px',
    color: 'primary.100'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  head: {
    display: 'flex',
    gap: '10px'
  },
  typography: {
    fontSize: '12px',
    fontWeight: '600',
    lineHeight: '20px'
  },
  name: {
    color: 'basic.darkBlue'
  },
  timestamp: {
    color: 'basic.greyBlue'
  },
  messageContent: {
    display: 'flex',
    padding: '20px',
    borderRadius: '5px',
    border: '2px solid',
    borderColor: 'basic.grey',
    backgroundColor: 'basic.white',
    boxShadow: chatShadow
  }
}
