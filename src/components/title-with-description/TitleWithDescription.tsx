import { ReactElement, ReactNode, useState } from 'react'
import { SxProps } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/title-with-description/TitleWithDescription.styles'

interface TitleWithDescriptionProps {
  title: string | ReactElement
  description?: string | ReactNode
  style?: {
    wrapper?: SxProps
    title?: SxProps
    description?: SxProps
  }
  useTooltip?: boolean
}

const TitleWithDescription = ({
  title,
  description,
  style = styles,
  useTooltip = false
}: TitleWithDescriptionProps) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  const handleTooltip = () => setTooltipVisible((prevState) => !prevState)
  if (useTooltip) {
    return (
      <Box sx={style.wrapper}>
        <Typography sx={style.title}>{title}</Typography>
        <Tooltip open={tooltipVisible} placement='bottom' title={description}>
          <Typography onClick={handleTooltip} sx={style.description}>
            {description}
          </Typography>
        </Tooltip>
      </Box>
    )
  } else {
    return (
      <Box sx={style.wrapper}>
        <Typography sx={style.title}>{title}</Typography>
        <Typography sx={style.description}>{description}</Typography>
      </Box>
    )
  }
}

export default TitleWithDescription
