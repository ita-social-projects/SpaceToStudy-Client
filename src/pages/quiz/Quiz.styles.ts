import { theme } from '~/styles/app-theme/custom-mui.styles'

const styles = {
  quizzesWrapper: {
    maxWidth: '936px',
    width: '100%',
    mx: 'auto'
  },
  divider: {
    color: 'primary.300',
    my: theme.spacing(4)
  },
  finishBlock: {
    button: {
      marginLeft: 'auto',
      backgroundColor: 'basic.grey',
      color: 'basic.black',
      minWidth: '97px',
      display: 'flex',
      alignItems: 'center',
      columnGap: theme.spacing(2),
      '&:hover': {
        backgroundColor: 'primary.100'
      }
    },
    root: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  },
  selectableQuestionQuizWrapper: {
    root: {
      mb: theme.spacing(5)
    }
  }
}

export default styles
