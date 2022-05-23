import Accordions from '../accordion/accordion.js'
import { Box } from '@mui/system'
import { useState } from 'react'


const style = {
  feature: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'center',
    pr:'24px',
    pl:'24px',
    overflow:'auto',
  },
  info: {
    maxWidth:{ md:'360px',sm:'229px' },
  },
  image: {
    maxHeight:'470px',
    overflow:'auto',
    mr: '24px'
  },
}

const AccordionWithImage = ({ items }) => {
    
  const [activeItemId, setActiveItemId] = useState(0)
 

  return(
    <Box sx={ style.feature }>
      <Box component="img" src={ items[activeItemId].image } sx={ style.image } />
      <Accordions
        activeIndex={ activeItemId } items={ items } onChange={ (id) => setActiveItemId(id) }
        styles={ style.info }
      />
    </Box>
  )
}


export default AccordionWithImage
