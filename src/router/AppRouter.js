import { Route, Routes, Navigate } from 'react-router-dom'

import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { mentor, student } from '~/constants'
import PrivateRoute from './helpers/PrivateRoute'
import GuestRoute from './helpers/GuestRoute'
import StudentRoutes from './routes/StudentRoutes'
import MentorRoutes from './routes/MentorRoutes'
import Logout from '~/pages/logout/Logout'
import ErrorRoutes from './routes/ErrorRoutes'

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
      <Route element={ <CookiePolicy /> } path={ guestRoutes.privacyPolicy.route } />
      <Route element={ <Logout /> } path={ studentRoutes.logout.route } />
      <Route element={ <ErrorRoutes /> } path={ guestRoutes.error.nested } />
      <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default AppRouter
