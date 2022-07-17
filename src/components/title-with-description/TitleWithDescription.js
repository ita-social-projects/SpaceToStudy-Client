import { Box, Typography } from '@mui/material'
import { styles } from '~/components/title-with-description/title-with-description.styles'

<<<<<<< HEAD
const TitleWithDescription = ({ title, titleStyles, description, descriptionStyles, componentStyles }) => {
  return (
    <Box sx={ { ...styles.wrapper, ...componentStyles } }>
      <Typography sx={ { ...styles.title, ...titleStyles } }>
        { title }
      </Typography>

      <Typography sx={ { ...descriptionStyles } }>
=======
const TitleWithDescription = ({ title, titleVariant, description, descriptionVariant, style = styles }) => {
  return (
    <Box sx={ style.wrapper }>
      <Typography sx={ { typography: titleVariant, ...style.title } }>
        { title }
      </Typography>

      <Typography sx={ { typography: descriptionVariant, ...style.description } }>
>>>>>>> create card component
        { description }
      </Typography>
    </Box>
  )
}

export default TitleWithDescription
