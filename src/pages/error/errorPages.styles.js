import { makeStyles } from '@mui/styles'
import errorPhoto from '../../img/error-page/401.svg'

export const useStyles = makeStyles((theme) => {
  return {
    root: {
      width: '50vw',
      marginLeft: 'auto',
      marginRight: 'auto',
      whiteSpace: 'break-spaces',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundImage: `url(${errorPhoto})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center right',
    }
  }
})

export default useStyles

