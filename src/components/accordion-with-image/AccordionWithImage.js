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
    width: { md:'360px',sm:'229px' },
    height: { md:'396px',sm:'244px' }
  },
  image: {
    width: { md:'744px',sm:'475px' },
    height: { md:'470px',sm:'300px' },
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
