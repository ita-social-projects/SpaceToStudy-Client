import React from 'react'
import { useContext } from 'react'
import Comp from '~/components/test-confirm-component/testConfirm'
import { ModalContext } from '~/context/modal-context'
import { Box } from '@mui/material'
import MapLogo from '~/img/guest-home-page/map.jpg'
import Accordions from '~/components/accordion/accordion'


const style = {
  container: {
    margin: '0 auto',
    maxWidth:'1128px'
  },
  mapSection: {
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

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }
  
  
  return (
    <Box sx={ style.container }>
      
      <button onClick={ handleModal }>click</button>

      <Box sx={ style.mapSection }>
        <Box component="img" src={ MapLogo } sx={ style.image }></Box>
        <Box sx={ style.leftBlock }>
          <Accordions />
        </Box>
      </Box>
    </Box>
    
    
  )
}

export default GuestHomePage

