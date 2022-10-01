import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { errorRoutes } from '~/router/constants/errorRoutes'

const TutorHome = lazy(() => import('~/pages/tutor-home/TutorHome'))

const TutorRoutes = () => {
  return (
    <Suspense fallback={ <Loader size={ 70 } /> }>
      <Routes>
        <Route element={ <TutorHome /> } index />
        <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
      </Routes>
    </Suspense>
  )
}

export default TutorRoutes
