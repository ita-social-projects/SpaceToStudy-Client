import { Box } from '@mui/material'
import TitleWithDescription from '../title-with-description/TitleWithDescription'
import { styles } from '~/components/card-with-image/card-with-image.styles'

const CardWithImage = ({ image, title, titleVariant, description, descriptionVariant, position }) => {

  return (
    
    <Box sx={ styles[position].box }>
      <Box sx={ styles[position].clearBox }></Box>
      <Box component="img" src={ image } sx={ styles[position].image }></Box>
      <TitleWithDescription
        description={ description }
        descriptionVariant={ descriptionVariant }
        style={ styles[position] }
        title={ title }
        titleVariant={ titleVariant }
      />
    </Box>
  
  )
}

export default CardWithImage
