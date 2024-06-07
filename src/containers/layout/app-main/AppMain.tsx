import { Suspense, useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs'
import Footer from '~/containers/layout/footer/Footer'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import Loader from '~/components/loader/Loader'
import { checkAuth } from '~/redux/reducer'
import ChatDialogWindow from '~/containers/offer-page/chat-dialog-window/ChatDialogWindow'
import { useChatContext } from '~/context/chat-context'
import useChangeUserStatus from '~/hooks/use-change-user-status'

import { styles } from '~/containers/app-content/AppContent.styles'

const AppMain = () => {
  const mainWithFooter = useRef(null)
  const authCheckRef = useRef(false)
  const { loading } = useAppSelector((state) => state.appMain)
  const { state } = useNavigation()
  const { chatInfo } = useChatContext()
  const dispatch = useAppDispatch()
  const { checkStatusChange } = useChangeUserStatus()

  useLayoutEffect(() => {
    !authCheckRef.current && void dispatch(checkAuth())

    return () => {
      authCheckRef.current = true
    }
  }, [dispatch])

  useEffect(() => {
    void checkStatusChange(
      'editProfilePage.profile.passwordSecurityTab.deactivatedAccountTitle',
      'editProfilePage.profile.passwordSecurityTab.deactivatedAccountDescription'
    )
  }, [checkStatusChange])

  if (loading || state === 'loading') {
    return <Loader pageLoad />
  }

  return (
    <Box ref={mainWithFooter} sx={styles.content}>
      <Suspense fallback={<Loader pageLoad />}>
        <AppBreadCrumbs />
        <ScrollToTop element={mainWithFooter} />
        <Outlet context={{ pageRef: mainWithFooter }} />
        {chatInfo && <ChatDialogWindow chatInfo={chatInfo} />}
        <ScrollToTopButton element={mainWithFooter} />
        <Footer />
      </Suspense>
    </Box>
  )
}

export default AppMain
