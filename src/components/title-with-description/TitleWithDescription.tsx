import { Box, Typography, SxProps } from '@mui/material'
import { styles } from '~/components/title-with-description/TitleWithDescription.styles'

interface TitleWithDescriptionProps {
  title: string
  description: string
  style?: {
    [key: string]: SxProps
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
      <Typography sx={style.description}>{description}</Typography>
    </Box>
  )
}

export default TitleWithDescription
