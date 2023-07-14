import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { tutor } from '~/constants'

import { guestRoutes } from '~/router/constants/guestRoutes'
import PrivateRoute from '~/router/helpers/PrivateRoute'

const TutorHome = lazy(() => import('~/pages/tutor-home/TutorHome'))

export const tutorRouter = (
  <Route element={<PrivateRoute role={[tutor]} />}>
    <Route element={<TutorHome />} path={guestRoutes.tutor.route} />
  </Route>
)
