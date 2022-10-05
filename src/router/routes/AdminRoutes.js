import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { errorRoutes } from '~/router/constants/errorRoutes'

const AdminHome = lazy(() => import('~/pages/admin-home/AdminHome'))

const AdminRoutes = () => {
  return (
    <Suspense fallback={ <Loader size={ 70 } /> }>
      <Routes>
        <Route element={ <AdminHome /> } index />
        <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
      </Routes>
    </Suspense>
  )
}

export default AdminRoutes
