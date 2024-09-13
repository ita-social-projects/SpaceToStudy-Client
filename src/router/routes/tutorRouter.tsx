import { lazy } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from '~/router/helpers/PrivateRoute'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { UserRoleEnum } from '~/types'
import { myOffers } from '../constants/crumbs'
import { authRoutes } from '../constants/authRoutes'

const TutorHome = lazy(() => import('~/pages/tutor-home/TutorHome'))
const MyOffers = lazy(() => import('~/pages/my-offers/MyOffers'))

export const tutorRouter = (
  <Route element={<PrivateRoute role={[UserRoleEnum.Tutor]} />}>
    <Route element={<TutorHome />} path={guestRoutes.tutor.route} />
    <Route
      element={<MyOffers />}
      handle={{ crumb: myOffers }}
      path={authRoutes.myOffers.route}
    />
  </Route>
)
