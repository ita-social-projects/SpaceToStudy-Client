import { theme } from '~/styles/app-theme/custom-mui.styles'

const styles = {
  wrapper: {
    '& .MuiDialog-paper': {
      borderRadius: '8px',
      p: theme.spacing(6, 4, 4),
      position: 'relative'
    }
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: theme.spacing(2)
  },
  titleWrapper: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    color: 'var(--s2s-blue-gray-800)',
    lineHeight: '24px',
    textAlign: 'center',
    padding: theme.spacing(0, 3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  title: {
    p: 0,
    lineHeight: '24px'
  },
  description: {
    lineHeight: '24px',
    fontWeight: 400,
    color: 'var(--s2s-blue-gray-500)',
    maxWidth: '448px',
    pt: 0
  },
  actions: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2)
  }
}

export default styles
