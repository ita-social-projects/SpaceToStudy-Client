import { Box } from '@mui/material'
import TitleWithDescription from '../title-with-description/TitleWithDescription'

const style ={
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    width: '615px',
    height: '90px'
  }
}

const ImageWithTitleAndDescription = ({ image, title, titleVariant, description, descriptionVariant }) => {
  return (
    <Box sx={ style.wrapper }>
      <Box component="img" src={ image } sx={ { mr: '60px', witdh: '88px', height: '88px' } }></Box>
      <TitleWithDescription
        description={ description }
        descriptionVariant={ descriptionVariant }
        title={ title }
        titleVariant={ titleVariant }
      />
    </Box>
  )
}

export default ImageWithTitleAndDescription
