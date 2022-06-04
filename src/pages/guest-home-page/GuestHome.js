import React from 'react'
import { useContext } from 'react'
import Comp from '~/components/test-confirm-component/testConfirm'
import { ModalContext } from '~/context/modal-context'
import { Box } from '@mui/material'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
import WelcomeBlock from '~/containers/guest-home-page/WelcomeBlock'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)

  const handleModal = () => {
    setModal(<Comp />)
  }
  
  return (
    <Box>
      <button onClick={ handleModal }>click</button>
      <WelcomeBlock />
      <FeatureBlock items={ descriptionTimes }  />
    </Box>
  )
}

export default GuestHomePage

