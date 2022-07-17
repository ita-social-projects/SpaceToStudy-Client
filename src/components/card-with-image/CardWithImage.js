import { Box } from '@mui/material'
import TitleWithDescription from '../title-with-description/TitleWithDescription'
import { styles } from '~/components/card-with-image/card-with-image.styles'

const CardWithImage = ({ image, title, titleVariant, description, descriptionVariant, side }) => {
  return (
    <Box sx={ styles[side].wrap }>
      <Box sx={ styles[side].box }>
        <Box component="img" src={ image } sx={ styles[side].image }></Box>
        <TitleWithDescription
          description={ description }
          descriptionVariant={ descriptionVariant }
          style={ styles[side] }
          title={ title }
          titleVariant={ titleVariant }
        />
      </Box>
    </Box>
  )
}

export default CardWithImage
