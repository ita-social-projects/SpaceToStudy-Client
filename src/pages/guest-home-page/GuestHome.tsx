import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import Box from '@mui/material/Box'

import { descriptionTimes } from '~/components/accordion-with-image/accordion-with-image.constants'
import PageWrapper from '~/components/page-wrapper/PageWrapper'
import EmailConfirmModal from '~/containers/email-confirm-modal/EmailConfirmModal'
import FeatureBlock from '~/containers/guest-home-page/FeatureBlock'
import Welcome from '~/containers/guest-home-page/Welcome'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'
import HowItWorks from '~/containers/guest-home-page/how-it-works/HowItWorks'
import LoginDialog from '~/containers/guest-home-page/login-dialog/LoginDialog'
import ResetPassword from '~/containers/guest-home-page/reset-password/ResetPassword'
import WhoWeAre from '~/containers/guest-home-page/who-we-are/WhoWeAre'
import { useModalContext } from '~/context/modal-context'
import { styles } from '~/pages/guest-home-page/GuestHome.styles'

const GuestHomePage = () => {
  const { openModal } = useModalContext()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const confirmToken = searchParams.get('confirmToken')
    const resetToken = searchParams.get('resetToken')
    confirmToken &&
      openModal({
        component: (
          <EmailConfirmModal
            confirmToken={confirmToken}
            openModal={openModal}
          />
        )
      })
    resetToken &&
      openModal({
        component: (
          <ResetPassword openModal={openModal} resetToken={resetToken} />
        )
      })
    searchParams.get('login') !== null &&
      openModal({ component: <LoginDialog /> })

    setSearchParams([])
  }, [searchParams, setSearchParams, openModal])

  return (
    <Box sx={styles.root}>
      <Welcome />
      <PageWrapper sx={styles.sectionsWrapper}>
        <FeatureBlock items={descriptionTimes} />
        <WhatCanYouDo />
        <HowItWorks />
        <WhoWeAre />
      </PageWrapper>
    </Box>
  )
}
export default GuestHomePage
