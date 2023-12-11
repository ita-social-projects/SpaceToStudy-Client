import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Box, { BoxProps } from '@mui/material/Box'

import { spliceSx } from '~/utils/helper-functions'
import { styles } from '~/components/app-card/AppCard.styles'

interface AppCardProps extends BoxProps {
  children: ReactNode
  link?: string
  onClick?: () => void
}

const AppCard: FC<AppCardProps> = ({
  children,
  link,
  onClick,
  sx = {},
  ...props
}) => {
  const isClickable = Boolean(link ?? onClick)

  return (
    <Box
      component={link ? Link : Box}
      onClick={onClick}
      sx={spliceSx(styles.container(isClickable), sx)}
      to={link}
      {...props}
    >
      {children}
    </Box>
  )
}

export default AppCard
