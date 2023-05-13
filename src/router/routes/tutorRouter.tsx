import { lazy } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from '~/router/helpers/PrivateRoute'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { tutorCooperations, tutorProfile } from '~/router/constants/crumbs'
import { UserRoleEnum } from '~/types'

const TutorHome = lazy(() => import('~/pages/tutor-home/TutorHome'))
const TutorProfile = lazy(() => import('~/pages/tutor-profile/TutorProfile'))
const MyCooperations = lazy(
  () => import('~/pages/my-cooperations/MyCooperations')
)

export const tutorRouter = (
  <Route
    element={<PrivateRoute role={[UserRoleEnum.Tutor]} />}
    path={guestRoutes.tutor.route}
  >
    <Route element={<TutorHome />} index />
    <Route
      element={<TutorProfile />}
      handle={{ crumb: tutorProfile }}
      path={tutorRoutes.accountMenu.myProfile.route}
    />
    <Route
      element={<MyCooperations />}
      handle={{ crumb: tutorCooperations }}
      path={tutorRoutes.accountMenu.myCooperations.route}
    />
  </Route>
)
