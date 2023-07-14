import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { student } from '~/constants'

import { guestRoutes } from '~/router/constants/guestRoutes'
import PrivateRoute from '~/router/helpers/PrivateRoute'

const StudentHome = lazy(() => import('~/pages/student-home/StudentHome'))

export const studentRouter = (
  <Route element={<PrivateRoute role={[student]} />}>
    <Route element={<StudentHome />} path={guestRoutes.student.route} />
  </Route>
)
