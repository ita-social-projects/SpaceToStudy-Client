import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import Box from '@mui/material/Box'

import { styles } from '~/components/app-card/AppCard.styles'

interface AppCardProps {
  children: ReactNode
  isClickable?: boolean
  link?: string
}

const AppCard: FC<AppCardProps> = ({ children, isClickable = true, link }) => {
  return (
    <Box
      component={ link ? Link : 'div' } sx={ styles.container(isClickable) }
      to={ link }
    >
      { children }
    </Box>
  )
}

export default AppCard
