import React from 'react'
import { useContext } from 'react'
import Comp from '~/components/test-confirm-component/testConfirm'
import { ModalContext } from '~/context/modal-context'
import { Box } from '@mui/material'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import accordionInfo from '~/components/accordion-with-image/accordionInfo'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }
  
  return (
    <Box>
      
      <button onClick={ handleModal }>click</button>

      <Box sx={ { display:'flex',justifyContent:'center',alignItems:'center' } }>
        <AccordionWithImage accordionArray={ accordionInfo } />
      </Box>
    </Box>
    
    
  )
}

export default GuestHomePage

