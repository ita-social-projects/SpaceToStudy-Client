import { Box } from '@mui/material'

import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
import { useContext, useEffect } from 'react'
import { ModalContext } from '~/context/modal-context'
import { useSearchParams } from 'react-router-dom'
import EmailConfirmModal from '~/components/modals/email-confirm-modal/email-confirm-modal'
const GuestHomePage = () => {

  const { setModal } = useContext(ModalContext)

  const [ searchParams ] = useSearchParams()
  const confirmToken = searchParams.get('confirmToken')

  useEffect(() =>
    confirmToken && setModal(<EmailConfirmModal confirmToken={ confirmToken } />)
  , [])
  
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
