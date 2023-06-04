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
  const { loading } = useAppSelector((state) => state.appMain)
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    void dispatch(checkAuth())
  }, [dispatch])

  if (loading) {
    return <Loader pageLoad size={70} />
  }

  return (
    <Box ref={mainWithFooter} sx={styles.content}>
      <Suspense fallback={<Loader pageLoad size={70} />}>
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
