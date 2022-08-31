import { Route, Routes, Navigate } from 'react-router-dom'

import InternalServerError from '~/pages/error/InternalServerError'
import NotFound from '~/pages/error/NotFound'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'
import BadRequest from '~/pages/error/BadRequest'
import AuthPolicy from '~/pages/error/AuthPolicy'
import { errors, routes } from '~/constants/routes'
import { mentor, student } from '~/constants'
import { MentorRoutes, StudentRoutes } from './routes'
import { PrivateRoute } from './helpers/PrivateRoute'
import { GuestRoute } from './helpers/GuestRoute'

const AppRouter = ({ userRole }) => {
  return (
    <Routes>
      <Route element={ <GuestRoute userRole={ userRole } /> } path={ routes.home.route } />
      <Route
        element={
          <PrivateRoute role={ student } userRole={ userRole }>
            <StudentRoutes />
          </PrivateRoute>
        }
        path={ routes.student.nested }
      />
      <Route
        element={
          <PrivateRoute role={ mentor } userRole={ userRole }>
            <MentorRoutes />
          </PrivateRoute>
        }
        path={ routes.mentor.nested }
      />
      <Route element={ <BadRequest /> } path={ errors.badRequest.route } />
      <Route element={ <AuthPolicy /> } path={ errors.authPolicy.route } />
      <Route element={ <CookiePolicy /> } path={ routes.privacyPolicy.route } />
      <Route element={ <NotFound /> } path={ errors.notFound.route } />
      <Route element={ <InternalServerError /> } path={ errors.internalServerError.route } />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export default AppRouter
