import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { styles } from '~/components/loader/Loader.styles'
import { spliceSx } from '~/utils/helper-functions'

const Loader = ({ size = 70, sx, pageLoad = false }) => {
  return (
    <Box data-testid='loader' sx={styles.container(pageLoad)}>
      <CircularProgress size={size} sx={spliceSx(styles.loader, sx)} />
    </Box>
  )
}
export default Loader
