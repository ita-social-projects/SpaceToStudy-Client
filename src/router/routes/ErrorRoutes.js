import { Navigate, Route, Routes } from 'react-router-dom'

import { errorRoutes } from '~/router/constants/errorRoutes'
import AuthPolicy from '~/pages/error/AuthPolicy'
import BadRequest from '~/pages/error/BadRequest'
import InternalServerError from '~/pages/error/InternalServerError'
import NotFound from '~/pages/error/NotFound'

const ErrorRoutes = () => {
  return (
    <Routes>
      <Route element={ <BadRequest /> } path={ errorRoutes.badRequest.route } />
      <Route element={ <AuthPolicy /> } path={ errorRoutes.authPolicy.route } />
      <Route element={ <NotFound /> } path={ errorRoutes.notFound.route } />
      <Route element={ <InternalServerError /> } path={ errorRoutes.internalServerError.route } />
      <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default ErrorRoutes
