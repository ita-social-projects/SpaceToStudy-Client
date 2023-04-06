import Box from '@mui/material/Box'

import { styles } from '~/components/app-card/AppCard.styles'

const AppCard = ({ children, isClickable = true }) => {
  return <Box sx={styles.container(isClickable)}>{children}</Box>
}

export default AppCard
