import { ReactElement, ReactNode } from 'react'
import { SxProps } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/title-with-description/TitleWithDescription.styles'

interface TitleWithDescriptionProps {
  title?: string | ReactElement
  description?: string | ReactNode
  style?: {
    wrapper?: SxProps
    title?: SxProps
    description?: SxProps
  }
  isDescriptionTooltip?: boolean
}

const TitleWithDescription = ({
  title,
  description,
  style = styles,
  isDescriptionTooltip = false
}: TitleWithDescriptionProps) => {
  return (
    <Box sx={style.wrapper}>
      {title && <Typography sx={style.title}>{title}</Typography>}
      <Tooltip
        placement='bottom'
        title={isDescriptionTooltip ? description : ''}
      >
        <Typography sx={style.description}>{description}</Typography>
      </Tooltip>
    </Box>
  )
}

export default TitleWithDescription
