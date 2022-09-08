import { useEffect, useContext } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'

import { ModalContext } from '~/context/modal-context'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import Welcome from '~/containers/guest-home-page/Welcome'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import { descriptionTimes } from '~/components/accordion-with-image/descriptionTimes'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'

const GuestHomePage = () => {
  const { search } = useLocation()

  const { setModal } = useContext(ModalContext)
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const confirmToken = searchParams.get('confirmToken')
  const resetToken = searchParams.get('resetToken')

  useEffect(() => {
    search === '?login' && setModal(<LoginDialog />)
    navigate('/')
  }, [search, setModal, navigate])

  useEffect(() => {
    confirmToken && setModal(<EmailConfirmModal confirmToken={ confirmToken } setModal={ setModal } />)
    resetToken && setModal(<ResetPassword resetToken={ resetToken } />)
    navigate('/')
  }, [confirmToken, setModal, navigate, resetToken])

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
