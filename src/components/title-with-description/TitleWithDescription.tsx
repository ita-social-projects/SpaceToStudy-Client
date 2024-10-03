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
  isHighlighted?: boolean
}

const TitleWithDescription = ({
  title,
  description,
  style = styles,
  isDescriptionTooltip = false,
  isHighlighted = false
}: TitleWithDescriptionProps) => {
  const renderDescription = () => {
    if (typeof description !== 'string') {
      return <Box sx={style.description}>{description}</Box>
    }
    return <Typography sx={style.description}>{description}</Typography>
  }

  return (
    <Box
      sx={{ ...style.wrapper, position: isHighlighted ? 'relative' : 'static' }}
    >
      {title && <Typography sx={style.title}>{title}</Typography>}
      <Tooltip
        arrow
        placement='bottom'
        title={isDescriptionTooltip ? description : ''}
      >
        {renderDescription()}
      </Tooltip>
    </Box>
  )
}

export default TitleWithDescription
