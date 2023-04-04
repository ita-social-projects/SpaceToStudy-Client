import { FC, MouseEventHandler, ReactNode } from 'react'
import Box from '@mui/material/Box'

import { styles } from '~/components/app-card/AppCard.styles'

interface AppCardProps {
  children: ReactNode
  isClickable?: boolean
  onClick?: MouseEventHandler<HTMLDivElement>
}

const AppCard: FC<AppCardProps> = ({ children, isClickable = true, onClick }) => {
  return (
    <Box onClick={ onClick } sx={ styles.container(isClickable) }>
      { children }
    </Box>
  )
}

export default AppCard