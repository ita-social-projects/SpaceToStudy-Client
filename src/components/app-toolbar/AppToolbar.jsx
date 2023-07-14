import Box from '@mui/material/Box'

import { styles } from '~/components/app-toolbar/AppToolbar.styles'

const AppToolbar = ({ sx, children }) => {
  return <Box sx={{ ...styles.container, ...sx }}>{children}</Box>
}

export default AppToolbar
