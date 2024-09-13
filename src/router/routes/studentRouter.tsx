import { lazy } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from '~/router/helpers/PrivateRoute'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { UserRoleEnum } from '~/types'
import { myRequests } from '../constants/crumbs'
import { authRoutes } from '../constants/authRoutes'

const StudentHome = lazy(() => import('~/pages/student-home/StudentHome'))
const MyRequests = lazy(() => import('~/pages/my-offers/MyOffers'))

export const studentRouter = (
  <Route element={<PrivateRoute role={[UserRoleEnum.Student]} />}>
    <Route element={<StudentHome />} path={guestRoutes.student.route} />
    <Route
      element={<MyRequests />}
      handle={{ crumb: myRequests }}
      path={authRoutes.myRequests.route}
    />
  </Route>
)
