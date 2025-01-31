import { theme } from '~/styles/app-theme/custom-mui.styles'
import { TypographyVariantEnum } from '~/types'

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
  },
  attemptWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing(5)
  },
  attemptTypographyWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  typography: {
    typography: TypographyVariantEnum.Subtitle1,
    color: 'primary.500'
  }
}

export default styles
