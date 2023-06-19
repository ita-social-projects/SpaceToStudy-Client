import { FC } from 'react'
import { Link } from 'react-router-dom'

import Box, { BoxProps } from '@mui/material/Box'

import { styles } from '~/components/app-card/AppCard.styles'

interface AppCardProps extends BoxProps {
  link?: string
}

const AppCard: FC<AppCardProps> = ({ children, link, sx = {}, ...props }) => {
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
