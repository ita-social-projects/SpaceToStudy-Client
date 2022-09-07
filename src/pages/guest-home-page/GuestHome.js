import { useEffect, useContext } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

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

const GuestHomePage = () => {
  const { search } = useLocation()

  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const confirmToken = searchParams.get('confirmToken')
  const resetToken = searchParams.get('resetToken')

  useEffect(() => {
    search === '?login' && openModal(<LoginDialog />)
    navigate('/')
  }, [search, openModal, navigate])

  useEffect(() => {
    confirmToken && openModal({ component:<EmailConfirmModal confirmToken={ confirmToken } openModal={ openModal } /> })
	 resetToken && openModal({ component:<ResetPassword openModal={ openModal } resetToken={ resetToken } /> })

    navigate('/')
  }, [confirmToken, openModal, navigate, resetToken])

  return (
    <Box data-testid='guestHome'>
      <Welcome />
      <Box sx={ { maxWidth: '1128px', margin: '0 auto', overflowX: 'hidden' } }>
        <FeatureBlock items={ descriptionTimes } />
        <WhatCanYouDo />
        <HowItWorks />
        <WhoWeAre />
      </Box>
    </Box>
  )
}
export default GuestHomePage
