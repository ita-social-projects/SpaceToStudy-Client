import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loader from '~/components/loader/Loader'

const GuestHomePage = lazy(() => import('~/pages/guest-home-page/GuestHome'))

const GuestRoutes = () => {
  return (
    <Suspense fallback={ <Loader size={ 70 } /> }>
      <Routes>
        <Route element={ <GuestHomePage /> } index />
      </Routes>
    </Suspense>
  )
}

export default GuestRoutes
