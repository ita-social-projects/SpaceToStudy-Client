import { lazy } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from '~/router/helpers/PrivateRoute'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { UserRoleEnum } from '~/types'

const TutorHome = lazy(() => import('~/pages/tutor-home/TutorHome'))

export const tutorRouter = (
  <Route element={<PrivateRoute role={[UserRoleEnum.Tutor]} />}>
    <Route element={<TutorHome />} path={guestRoutes.tutor.route} />
  </Route>
)
