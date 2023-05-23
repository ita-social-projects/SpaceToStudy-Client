import { ReactElement, ReactNode } from 'react'
import { Box, Typography, SxProps } from '@mui/material'
import { styles } from '~/components/title-with-description/TitleWithDescription.styles'

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
      <Typography component={'span'} sx={style.description}>
        {description}
      </Typography>
    </Box>
  )
}

export default TitleWithDescription
