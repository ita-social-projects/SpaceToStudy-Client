import { Box, Typography } from '@mui/material'

import { type ReactNode } from 'react'
import { styles } from './CooperationActionBanner.styles'

type Properties = {
  actionButtons?: ReactNode
  children?: ReactNode
  description: ReactNode
  icon?: ReactNode
  title: string
}

const CooperationActionBanner: React.FC<Properties> = ({
  actionButtons,
  children,
  description,
  icon,
  title
}) => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.mainContentWrapper}>
        <Box>
          <Box sx={styles.header}>
            {icon}
            <Typography>{title}</Typography>
          </Box>
          <Typography sx={styles.description}>{description}</Typography>
        </Box>
        {actionButtons && <Box sx={styles.buttonsWrapper}>{actionButtons}</Box>}
      </Box>
      {children && <Box>{children}</Box>}
    </Box>
  )
}

export default CooperationActionBanner
