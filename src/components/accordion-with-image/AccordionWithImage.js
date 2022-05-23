import Accordions from '../accordion/accordion.js'
import { Box } from '@mui/system'
import { useState } from 'react'


const style = {
  feature: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth:'1128px',
    maxHeight:'470px',
    pr:'24px',
    pl:'24px'
  },
  info: {
    width:'34%',
    maxHeight:'396px',
  },
  image: {
    width:'66%',
    height:'auto',
    mr: '24px'
  },
}

const AccordionWithImage = ({ accordionArray }) => {
    
  const [activeItem, setActiveItem] = useState(accordionArray[0])

  const onChange = (item) => {
    setActiveItem(item)
  }
 

  return(
    <Box sx={ style.feature }>
      <Box component="img" src={ activeItem.image } sx={ style.image } />
      <Box sx={ style.info }>
        { accordionArray.map(item =>(
          <Accordions
            expanded={ item.id === activeItem.id }
            item={ item }
            key={ item.id }
            onChange={ onChange }
          />
        )) 
        }
      </Box>
    </Box>
  )
}


export default AccordionWithImage
