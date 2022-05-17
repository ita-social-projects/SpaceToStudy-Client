import Accordions from '../../components/accordion/accordion.js'
import { Box } from '@mui/system'
import { useState } from 'react'
import data from './data.js'

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
    height: '396px'
  },
  image: {
    width: '744px',
    height: '470px',
    mr: '24px'
  },
}

const Feature = () => {
    
  const [image, setImage] = useState(data[0].image)
  const [expanded, setExpanded] = useState(data[0].id)

  return(
    <Box sx={ style.feature }>
      <Box component="img" src={ image } sx={ style.image } />
      <Box sx={ style.leftBlock }>
        { data.map(({ id, heading, subHeading, image })=>(
          <Accordions
            expanded={ expanded }
            heading={ heading }
            id={ id }
            image={ image } 
            key={ id }
            setExpanded={ setExpanded }
            setImage={ setImage }
            subHeading={ subHeading }
          />
        )) }
      </Box>
    </Box>
  )
}


export default Feature
