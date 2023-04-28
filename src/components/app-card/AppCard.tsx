import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'
import { SxProps } from '@mui/material'

import { styles } from '~/components/app-card/AppCard.styles'

interface AppCardProps {
  children: ReactNode
  link?: string
  sx?: SxProps
}

const AppCard: FC<AppCardProps> = ({ children, link, sx = {} }) => {
  return (
    <Box
      component={link ? Link : Box}
      sx={{ ...styles.container(Boolean(link)), ...sx }}
      to={link}
    >
      {children}
    </Box>
  )
}

export default AppCard
