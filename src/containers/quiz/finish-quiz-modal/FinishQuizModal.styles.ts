import { theme } from '~/styles/app-theme/custom-mui.styles'

const styles = {
  dialog: {
    '& .MuiDialog-paper': {
      borderRadius: '8px',
      p: theme.spacing(6, 4, 4)
    }
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing(2)
  },
  titleWrapper: {
    display: 'flex',
    gap: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'var(--s2s-blue-gray-800)',
    lineHeight: '24px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  title: {
    p: 0,
    lineHeight: '24px'
  },
  content: {
    lineHeight: '24px',
    fontWeight: 400,
    color: 'var(--s2s-blue-gray-500)',
    maxWidth: '428px',
    pt: 0,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      textAlign: 'center'
    }
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1),
    p: 0,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: theme.spacing(2),
      alignItems: 'stretch',
      '& > :not(style) ~ :not(style)': {
        marginLeft: 0
      }
    }
  }
}

export default styles
