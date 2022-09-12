import { Navigate, Route, Routes } from 'react-router-dom'

import { errors } from '~/constants/routes'
import AuthPolicy from '~/pages/error/AuthPolicy'
import BadRequest from '~/pages/error/BadRequest'
import InternalServerError from '~/pages/error/InternalServerError'
import NotFound from '~/pages/error/NotFound'

const ErrorRoutes = () => {
  return (
    <Routes>
      <Route element={ <BadRequest /> } path={ errors.badRequest.route } />
      <Route element={ <AuthPolicy /> } path={ errors.authPolicy.route } />
      <Route element={ <NotFound /> } path={ errors.notFound.route } />
      <Route element={ <InternalServerError /> } path={ errors.internalServerError.route } />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export default ErrorRoutes
