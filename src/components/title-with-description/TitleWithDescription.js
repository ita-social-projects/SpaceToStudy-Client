import { styles } from '~/components/title-with-description/title-with-description.styles'
import { Box, Typography } from '@mui/material'

const TitleWithDescription = ({ title, titleVariant, description, descriptionVariant, style = styles }) => {
  return (
    <Box sx={ { ...style.wrapper } }>
      <Typography sx={ { typography: titleVariant, ...style.title } }>
        { title }
      </Typography>

      <Typography sx={ { typography: descriptionVariant, ...style.description } }>
        { description }
      </Typography>
    </Box>
  )
}

export default TitleWithDescription
