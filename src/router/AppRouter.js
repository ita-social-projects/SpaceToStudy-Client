import { Route, Routes, Navigate } from 'react-router-dom'

import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'
import { errors, routes } from '~/constants/routes'
import { mentor, student } from '~/constants'
import PrivateRoute from './helpers/PrivateRoute'
import GuestRoute from './helpers/GuestRoute'
import StudentRoutes from './routes/StudentRoutes'
import MentorRoutes from './routes/MentorRoutes'
import ErrorRoutes from './routes/ErrorRoutes'

const AppRouter = ({ userRole }) => {
  return (
    <Routes>
      <Route element={ <GuestRoute userRole={ userRole } /> } path={ routes.home.nested } />
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
      <Route element={ <CookiePolicy /> } path={ routes.privacyPolicy.route } />
      <Route element={ <ErrorRoutes /> } path={ routes.error.nested } />
      <Route element={ <Navigate to={ errors.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default AppRouter
