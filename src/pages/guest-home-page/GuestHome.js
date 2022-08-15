import { Box } from '@mui/material'
import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { ModalContext } from '~/context/modal-context'
import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'

const GuestHomePage = () => {
  const { setModal } = useContext(ModalContext)
  const { search } = useLocation()
  
  useEffect(() => search === '?login' && setModal(<LoginDialog />), [])

  return (
    <Box data-testid="guestHome">
      <Welcome />
      <FeatureBlock items={ descriptionTimes } />
      <WhatCanYouDo />
      <WhoWeAre />
    </Box>
  )
}

export default GuestHomePage
