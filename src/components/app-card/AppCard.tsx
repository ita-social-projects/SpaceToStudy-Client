import { FC, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { styles } from '~/components/app-card/AppCard.styles'
import Link from '@mui/material/Link'
import { Box } from '@mui/material'

interface AppCardProps {
  children: ReactNode
  isClickable?: boolean
  link: string
}

const AppCard: FC<AppCardProps> = ({ children, isClickable = true, link }) => {
  return (
    <Link component={ isClickable ? RouterLink : Box } sx={ styles.container(isClickable) } to={ link }>
      { children }
    </Link>
  )
}

export default AppCard
