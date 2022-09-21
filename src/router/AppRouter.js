import { Route, Routes, Navigate } from 'react-router-dom'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { adminRoutes } from '~/router/constants/adminRoutes'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { admin, mentor, student } from '~/constants'

import PrivateRoute from './helpers/PrivateRoute'
import GuestRoute from './helpers/GuestRoute'
import StudentRoutes from './routes/StudentRoutes'
import MentorRoutes from './routes/MentorRoutes'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'
import Logout from '~/pages/logout/Logout'
import ErrorRoutes from './routes/ErrorRoutes'
import AdminRoutes from './routes/AdminRoutes'

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
      <Route
        element={
          <PrivateRoute role={ admin } userRole={ userRole }>
            <AdminRoutes />
          </PrivateRoute>
        }
        path={ adminRoutes.admin.nested }
      />
      <Route element={ <CookiePolicy /> } path={ guestRoutes.privacyPolicy.route } />
      <Route element={ <Logout /> } path={ studentRoutes.accountMenu.logout.route } />
      <Route element={ <ErrorRoutes /> } path={ guestRoutes.error.nested } />
      <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default AppRouter
