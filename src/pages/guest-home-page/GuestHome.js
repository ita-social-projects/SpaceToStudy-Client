import { Box } from '@mui/material'
import { useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'

import { ModalContext } from '~/context/modal-context'
import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
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
      <Box sx={ { maxWidth:'1128px', margin:'0 auto' } }>
        <FeatureBlock items={ descriptionTimes }  />
        <WhatCanYouDo />
        <HowItWorks />
        <WhoWeAre />
      </Box>
    </Box>
  )
}

export default GuestHomePage
