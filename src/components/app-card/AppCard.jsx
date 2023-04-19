import Box from '@mui/material/Box'

import { styles } from '~/components/app-card/AppCard.styles'

const AppCard = ({ children, isClickable = true, sx }) => {
  return <Box sx={{ ...styles.container(isClickable), ...sx }}>{children}</Box>
}

export default AppCard
