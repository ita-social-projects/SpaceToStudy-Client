import { chatShadow } from '~/styles/app-theme/custom-shadows'

export const styles = {
  userInfoStyles: {
    root: {
      flexDirection: 'row',
      gap: '10px'
    },
    avatar: {
      width: '40px',
      height: '40px',
      borderRadius: '5px'
    },
    info: {
      flexDirection: 'row',
      alignItems: 'baseline',
      gap: '10px'
    },
    name: {
      typography: 'caption',
      fontWeight: '500',
      color: 'primary.700'
    },
    date: {
      typography: 'caption',
      color: 'primary.500'
    }
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  messageContent: {
    p: '20px',
    ml: '48px',
    border: '2px solid',
    borderColor: 'basic.grey',
    boxShadow: chatShadow
  }
}
