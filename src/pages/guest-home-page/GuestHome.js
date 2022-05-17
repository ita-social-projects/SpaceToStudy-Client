import React from 'react'
import { useContext } from 'react'
import Comp from '~/components/test-confirm-component/testConfirm'
import { ModalContext } from '~/context/modal-context'
import { Box } from '@mui/material'
import Feature from '~/containers/feature/feature'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }

  
  return (
    <Box sx={ { margin: '0 auto', maxWidth:'1128px' } }>
      
      <button onClick={ handleModal }>click</button>

      <Feature />
     
    </Box>
    
    
  )
}

export default GuestHomePage

