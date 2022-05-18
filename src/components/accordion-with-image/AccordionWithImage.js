import Accordions from '../accordion/accordion.js'
import { Box } from '@mui/system'
import { useState } from 'react'


const style = {
  feature: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0px',
    position: 'absolute',
    top: '360px'
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '360px',
    height: '396px',
  },
  image: {
    width: '744px',
    height: '470px', 
    mr: '24px'
  },
}

const AccordionWithImage = ({ accordionArray }) => {
    
  const [activeItem, setActiveItem] = useState(accordionArray[0])

  const onChange = (item) => {
    console.log(item)
    setActiveItem(item)
  }
 

  return(
    <Box sx={ style.feature }>
      <Box component="img" src={ activeItem.image } sx={ style.image } />
      <Box sx={ style.leftBlock }>
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
