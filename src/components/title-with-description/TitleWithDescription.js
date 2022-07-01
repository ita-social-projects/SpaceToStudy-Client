import { Box, Typography } from '@mui/material'
import { styles } from '~/components/title-with-description/title-with-description.styles'

const TitleWithDescription = ({ title, titleVariant, description, descriptionVariant }) => {
  return (
    <Box sx={ styles.wrapper }>
      <Typography sx={ { typography: titleVariant, ...styles.title } }>
        { title }
      </Typography>

      <Typography sx={ { typography: descriptionVariant } }>
        { description }
      </Typography>
    </Box>
  )
}

export default TitleWithDescription
