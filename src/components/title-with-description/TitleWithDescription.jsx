import { Box, Typography } from '@mui/material'
import { styles } from '~/components/title-with-description/TitleWithDescription.styles'

const TitleWithDescription = ({
  title,
  titleStyles,
  description,
  descriptionStyles,
  style = styles,
  componentStyles
}) => {
  return (
    <Box sx={{ ...style.wrapper, ...componentStyles }}>
      <Typography sx={{ ...style.title, ...titleStyles }}>{title}</Typography>
      <Typography sx={{ ...style.description, ...descriptionStyles }}>
        {description}
      </Typography>
    </Box>
  )
}

export default TitleWithDescription
