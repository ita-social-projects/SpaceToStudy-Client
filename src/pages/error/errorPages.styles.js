import { makeStyles } from '@mui/styles'
import errorPhoto from '../../img/error-page/401.svg'

export const useStyles = makeStyles (() => {
  return {
    text: {
      whiteSpace: 'break-spaces',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    root: {
      backgroundImage: `url(${errorPhoto})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center right',

    }
  }
})

export default useStyles

