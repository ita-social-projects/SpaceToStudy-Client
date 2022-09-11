import { Route, Routes, Navigate } from 'react-router-dom'

import InternalServerError from '~/pages/error/InternalServerError'
import NotFound from '~/pages/error/NotFound'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'
import BadRequest from '~/pages/error/BadRequest'
import AuthPolicy from '~/pages/error/AuthPolicy'
import { errorsRoutes } from '~/router/constants/errorsRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { mentor, student } from '~/constants'
import PrivateRoute from './helpers/PrivateRoute'
import GuestRoute from './helpers/GuestRoute'
import StudentRoutes from './routes/StudentRoutes'
import MentorRoutes from './routes/MentorRoutes'

const AppRouter = ({ userRole }) => {
  return (
    <Routes>
      <Route element={ <GuestRoute userRole={ userRole } /> } path={ guestRoutes.home.nested } />
      <Route
        element={
          <PrivateRoute role={ student } userRole={ userRole }>
            <StudentRoutes />
          </PrivateRoute>
        }
        path={ guestRoutes.student.nested }
      />
      <Route
        element={
          <PrivateRoute role={ mentor } userRole={ userRole }>
            <MentorRoutes />
          </PrivateRoute>
        }
        path={ guestRoutes.mentor.nested }
      />
      <Route element={ <BadRequest /> } path={ errorsRoutes.badRequest.path } />
      <Route element={ <AuthPolicy /> } path={ errorsRoutes.authPolicy.path } />
      <Route element={ <CookiePolicy /> } path={ guestRoutes.privacyPolicy.path } />
      <Route element={ <NotFound /> } path={ errorsRoutes.notFound.path } />
      <Route element={ <InternalServerError /> } path={ errorsRoutes.internalServerError.path } />
      <Route element={ <Navigate to={ errorsRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default AppRouter
