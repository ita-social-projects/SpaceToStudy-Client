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
  isDescriptionTooltip?: boolean
}

const TitleWithDescription = ({
  title,
  description,
  style = styles,
  isDescriptionTooltip = false
}: TitleWithDescriptionProps) => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  const handleTooltip = () => setTooltipVisible((prevState) => !prevState)

  return (
    <Box sx={style.wrapper}>
      <Typography sx={style.title}>{title}</Typography>
      {isDescriptionTooltip ? (
        <Tooltip open={tooltipVisible} placement='bottom' title={description}>
          <Typography onClick={handleTooltip} sx={style.description}>
            {description}
          </Typography>
        </Tooltip>
      ) : (
        <Typography onClick={handleTooltip} sx={style.description}>
          {description}
        </Typography>
      )}
    </Box>
  )
}

export default TitleWithDescription
