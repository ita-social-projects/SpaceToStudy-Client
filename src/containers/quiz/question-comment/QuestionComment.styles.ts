import { theme } from '~/styles/app-theme/custom-mui.styles'
import { TypographyVariantEnum } from '~/types'

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: theme.spacing(0),
    width: '100%'
  },
  commentIcon: {
    alignSelf: 'flex-end'
  },
  title: {
    color: 'primary.300',
    typography: TypographyVariantEnum.H6,
    fontSize: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  inputWrapper: {
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px',
      padding: theme.spacing(2, 7),
      boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      '& fieldset': {
        borderColor: 'transparent'
      }
    },
    '& .MuiOutlinedInput-root.Mui-focused': {
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
      '& fieldset': {
        borderColor: 'transparent'
      }
    },
    '&:hover .MuiOutlinedInput-root': {
      outline: 'none',
      '& fieldset': {
        borderColor: 'transparent'
      }
    }
  },
  avatarIcon: {
    position: 'absolute',
    top: '50%',
    left: theme.spacing(1),
    transform: 'translateY(-50%)',
    zIndex: 1
  },
  sendIcon: (isSent: boolean) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    display: isSent ? 'none' : 'block'
  })
}

export default styles
