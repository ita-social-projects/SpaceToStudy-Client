import { ReactElement, ReactNode } from 'react'
import { SxProps } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/title-with-description/TitleWithDescription.styles'
import { ComponentEnum } from '~/types'

interface TitleWithDescriptionProps {
  title: string | ReactElement
  description?: string | ReactNode
  style?: {
    wrapper?: SxProps
    title?: SxProps
    description?: SxProps
  }
}

const TitleWithDescription = ({
  title,
  description,
  style = styles
}: TitleWithDescriptionProps) => {
  return (
    <Box sx={style.wrapper}>
      <Typography sx={style.title}>{title}</Typography>
      <Typography component={ComponentEnum.Span} sx={style.description}>
        {description}
      </Typography>
    </Box>
  )
}

export default TitleWithDescription
