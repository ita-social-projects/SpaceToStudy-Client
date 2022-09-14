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
    <Box sx={ { ...style.wrapper, ...componentStyles } }>
      <Typography sx={ { ...titleStyles, ...style.title } }>
        { title }
      </Typography>
      <Typography sx={ { ...descriptionStyles, ...style.description } }>
        { description }
      </Typography>
    </Box>
  )
}

export default TitleWithDescription
