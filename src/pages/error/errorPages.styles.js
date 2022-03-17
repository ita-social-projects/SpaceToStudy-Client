import { makeStyles } from '@mui/styles'
import errorPhoto401 from '../../img/error-page/401.svg'

export const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginLeft: 'auto',
      marginRight: 'auto',
      whiteSpace: 'break-spaces',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      backgroundImage: `url(${errorPhoto401})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center right',
    }
  }
})

export default useStyles

