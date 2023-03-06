import { useEffect, useContext, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'
import { descriptionTimes } from '~/components/accordion-with-image/accordion-with-image.constants'

import { ModalContext } from '~/context/modal-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'
import Footer from '~/containers/layout/footer/Footer'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'

const GuestHomePage = () => {
  const { openModal } = useContext(ModalContext)
  const [searchParams, setSearchParams] = useSearchParams()

  const element = useRef(null)

  useEffect(() => {
    const confirmToken = searchParams.get('confirmToken')
    const resetToken = searchParams.get('resetToken')
    const login = searchParams.get('login')
    confirmToken && openModal({ component: <EmailConfirmModal confirmToken={ confirmToken } openModal={ openModal } /> })
    resetToken && openModal({ component: <ResetPassword openModal={ openModal } resetToken={ resetToken } /> })
    login !== null && openModal({ component: <LoginDialog /> })

    setSearchParams([])
  }, [searchParams, setSearchParams, openModal])
 

  return (
    <Box data-testid='guestHome' ref={ element } sx={ { flex: 1, overflowY: 'auto' } }>
      <Welcome />
      <Box sx={ { maxWidth: '1128px', margin: '0 auto', overflowX: 'hidden' } } >
        <FeatureBlock items={ descriptionTimes } />
        <WhatCanYouDo />
        <HowItWorks />
        <WhoWeAre />
      </Box>
      <ScrollToTopButton element={ element } />
      <Footer  />
    </Box>
  )
}
export default GuestHomePage
