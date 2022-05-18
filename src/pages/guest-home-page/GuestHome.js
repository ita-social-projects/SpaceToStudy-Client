import React from 'react'
import { useContext } from 'react'
import Comp from '~/components/test-confirm-component/testConfirm'
import { ModalContext } from '~/context/modal-context'
import { Box } from '@mui/material'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import accordionArray from '~/components/accordion-with-image/accordionArray'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }
  
  return (
    <Box sx={ { margin: '0 auto', maxWidth:'1128px' } }>
      
      <button onClick={ handleModal }>click</button>

      <AccordionWithImage accordionArray={ accordionArray } />
     
    </Box>
    
    
  )
}

export default GuestHomePage

