import { useContext } from 'react'
import Comp from '~/components/test-confirm-component/testConfirm'
import { ModalContext } from '~/context/modal-context'
import { Box } from '@mui/material'
import MapLogo from '~/img/guest-home-page/map.jpg'
import Accordions from '~/components/accordion/accordion'


const style = {
  mapSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0px',
    position: 'absolute',
    top: '360px'
  },
  image: {
    width: '744px',
    height: '470px',
    mr: '24px'
  },
  leftBlock: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '360px',
    height: '396px'
  },
}

const data = [ 
  {
    image: MapLogo,
    id: 'panel1',
    heading:'Flexible Location', 
    subHeading:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    // image: '../img/guest-home-page/map.jpg',
    id: 'panel2',
    heading:'Individual Time', 
    subHeading:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    id: 'panel3',
    heading:'Free choice of teachers', 
    subHeading:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  },
  {
    
    id: 'panel4',
    heading:'Digital Communication', 
    subHeading:'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
  }
]

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }

  return (
    <div>
      
      <button onClick={ handleModal }>click</button>

      <Box sx={ style.mapSection }>
        <Box sx={ style.container }>
          <Box component="img" src={ MapLogo } sx={ style.image }></Box>
          <Box sx={ style.leftBlock }>
            { data.map(({ id,heading,subHeading }) => 
              (<Accordions
                heading={ heading } 
                id={ id } 
                key={ id }
                subHeading={ subHeading }
                // eslint-disable-next-line react/jsx-closing-bracket-location
              />)
            ) 
            } 
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default GuestHomePage
