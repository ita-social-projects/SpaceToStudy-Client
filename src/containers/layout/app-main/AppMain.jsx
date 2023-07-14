import Box from '@mui/material/Box'
import { Suspense, useLayoutEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigation } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import { styles } from '~/containers/app-content/AppContent.styles'
import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs'
import Footer from '~/containers/layout/footer/Footer'
import { checkAuth } from '~/redux/reducer'

const AppMain = () => {
  const mainWithFooter = useRef(null)
  const { loading } = useSelector((state) => state.appMain)
  const { state } = useNavigation()
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    void dispatch(checkAuth())
  }, [dispatch])

  if (loading || state === 'loading') {
    return <Loader pageLoad />
  }

  return (
    <Box ref={mainWithFooter} sx={styles.content}>
      <Suspense fallback={<Loader pageLoad />}>
        <AppBreadCrumbs />
        <ScrollToTop element={mainWithFooter} />
        <Outlet context={{ pageRef: mainWithFooter }} />
        <ScrollToTopButton element={mainWithFooter} />
        <Footer />
      </Suspense>
    </Box>
  )
}

export default AppMain
