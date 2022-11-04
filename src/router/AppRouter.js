import { Suspense, lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import AdminPortal from '~/containers/layout/admin-portal/AdminPortal'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { admin, tutor, student } from '~/constants'
import PrivateRoute from './helpers/PrivateRoute'
import GuestRoute from './helpers/GuestRoute'
import StudentRoutes from './routes/StudentRoutes'
import TutorRoutes from './routes/TutorRoutes'
import ErrorRoutes from './routes/ErrorRoutes'

const CookiePolicy = lazy(() => import('~/pages/cookie-policy/CookiePolicy'))
const Logout = lazy(() => import('~/pages/logout/Logout'))

const AppRouter = ({ userRole }) => {
  return (
    <Suspense fallback={ <Loader size={ 70 } /> }>
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
            <PrivateRoute role={ tutor } userRole={ userRole }>
              <TutorRoutes />
            </PrivateRoute>
          }
          path={ guestRoutes.tutor.nested }
        />
        <Route
          element={
            <PrivateRoute role={ admin } userRole={ userRole }>
              <AdminPortal />
            </PrivateRoute>
          }
          path={ guestRoutes.admin.nested }
        />
        <Route element={ <CookiePolicy /> } path={ guestRoutes.privacyPolicy.route } />
        <Route element={ <Logout /> } path={ studentRoutes.accountMenu.logout.route } />
        <Route element={ <ErrorRoutes /> } path={ guestRoutes.error.nested } />
        <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
      </Routes>
    </Suspense>
  )
}

export default AppRouter
