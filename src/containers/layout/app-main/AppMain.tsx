import { Suspense, useLayoutEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'

import { useAppDispatch, useAppSelector } from '~/hooks/use-redux'
import ScrollToTop from '~/components/scroll-to-top/ScrollToTop'
import AppBreadCrumbs from '~/containers/layout/app-breadcrumbs/AppBreadCrumbs'
import Footer from '~/containers/layout/footer/Footer'
import ScrollToTopButton from '~/components/scroll-to-top-button/ScrollToTopButton'
import Loader from '~/components/loader/Loader'
import { checkAuth } from '~/redux/reducer'
import { styles } from '~/containers/app-content/AppContent.styles'

const AppMain = () => {
  const mainWithFooter = useRef(null)
  const { authLoading } = useAppSelector((state) => state.appMain)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    void dispatch(checkAuth())
  }, [dispatch])

  if (authLoading) {
    return <Loader pageLoad size={70} />
  }

  return (
    <Suspense fallback={<Loader pageLoad size={70} />}>
      <Box ref={mainWithFooter} sx={styles.content}>
        <AppBreadCrumbs />
        <ScrollToTop />
        <Outlet />
        <ScrollToTopButton element={mainWithFooter} />
        <Footer />
      </Box>
    </Suspense>
  )
}

export default AppMain
