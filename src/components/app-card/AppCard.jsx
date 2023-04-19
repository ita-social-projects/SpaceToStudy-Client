import Box from '@mui/material/Box'

import { styles } from '~/components/app-card/AppCard.styles'

const AppCard = ({ children, isClickable = true, containerCardStyles }) => {
  return (
    <Box sx={{ ...styles.container(isClickable), ...containerCardStyles }}>
      {children}
    </Box>
  )
}

export default AppCard
