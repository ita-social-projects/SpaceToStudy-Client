import React from 'react'
import { useContext } from 'react'
import Comp from '~/components/test-confirm-component/testConfirm'
import { ModalContext } from '~/context/modal-context'
import { Box } from '@mui/material'
import AccordionWithImage from '~/components/accordion-with-image/AccordionWithImage'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
import WelcomeBlock from '~/containers/guest-home-page/WelcomeBlock'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }
  
  return (
    <Box>
      <button onClick={ handleModal }>click</button>
      <WelcomeBlock />
      <AccordionWithImage items={ descriptionTimes }  />
    </Box>
  )
}

export default GuestHomePage

