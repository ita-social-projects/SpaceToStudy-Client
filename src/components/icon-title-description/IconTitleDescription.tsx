import { FC, ReactNode } from 'react'
import { SxProps } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/system/Box'

import { styles } from '~/components/icon-title-description/IconTitleDescription.styles'

interface IconTitleDescriptionProps {
  icon: ReactNode
  title: string
  description?: string | ReactNode
  sx?: {
    [key: string]: SxProps
  }
}

const IconTitleDescription: FC<IconTitleDescriptionProps> = ({
  icon,
  title,
  description,
  sx = styles
}) => {
  return (
    <Box sx={sx.container}>
      <Box sx={sx.icon}>{icon}</Box>

      <Box sx={sx.textWrapper}>
        <Typography sx={sx.title}>{title}</Typography>

        {description && <Box sx={sx.description}>{description}</Box>}
      </Box>
    </Box>
  )
}

export default IconTitleDescription
