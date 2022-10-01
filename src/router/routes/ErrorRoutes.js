import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { errorRoutes } from '~/router/constants/errorRoutes'

const AuthPolicy = lazy(() => import('~/pages/error/AuthPolicy'))
const BadRequest = lazy(() => import('~/pages/error/BadRequest'))
const InternalServerError = lazy(() => import('~/pages/error/InternalServerError'))
const NotFound = lazy(() => import('~/pages/error/NotFound'))

const ErrorRoutes = () => {
  return (
    <Suspense fallback={ <Loader size={ 70 } /> }>
      <Routes>
        <Route element={ <BadRequest /> } path={ errorRoutes.badRequest.route } />
        <Route element={ <AuthPolicy /> } path={ errorRoutes.authPolicy.route } />
        <Route element={ <NotFound /> } path={ errorRoutes.notFound.route } />
        <Route element={ <InternalServerError /> } path={ errorRoutes.internalServerError.route } />
        <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
      </Routes>
    </Suspense>
  )
}

export default ErrorRoutes
