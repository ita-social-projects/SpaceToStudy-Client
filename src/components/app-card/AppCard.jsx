import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'

import { styles } from '~/components/app-card/AppCard.styles'

const AppCard = ({ children, link, sx = {}, ...props }) => {
  return (
    <Box
      component={link ? Link : Box}
      sx={{ ...styles.container(Boolean(link)), ...sx }}
      to={link}
      {...props}
    >
      {children}
    </Box>
  )
}

export default AppCard
