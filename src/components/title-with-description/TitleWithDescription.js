import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { styles } from '~/components/title-with-description/title-with-description.styles'

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
