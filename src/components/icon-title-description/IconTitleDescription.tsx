import { FC, ReactElement, ReactNode } from 'react'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'

import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'

import { styles } from '~/components/icon-title-description/IconTitleDescription.styles'

type Sx = {
  container?: SxProps
  icon?: SxProps
  titleWithDescription?: {
    wrapper?: SxProps
    title?: SxProps
    description?: SxProps
  }
}
interface IconTitleDescriptionProps {
  icon: ReactElement
  title: string | ReactElement
  description?: string | ReactNode
  sx?: Sx
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

      <TitleWithDescription
        description={description}
        style={sx.titleWithDescription}
        title={title}
      />
    </Box>
  )
}

export default IconTitleDescription
