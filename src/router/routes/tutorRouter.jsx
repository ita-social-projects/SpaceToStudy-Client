import { t } from 'i18next'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '~/router/helpers/PrivateRoute'

import { guestRoutes } from '~/router/constants/guestRoutes'
import { tutorRoutes } from '~/router/constants/tutorRoutes'
import { tutor } from '~/constants'

const TutorHome = lazy(() => import('~/pages/tutor-home/TutorHome'))
const TutorProfile = lazy(() => import('~/pages/tutor-profile/TutorProfile'))

export const tutorRouter = (
  <Route element={ <PrivateRoute role={ tutor } /> } path={ guestRoutes.tutor.route }>
    <Route element={ <TutorHome /> } index />
    <Route
      element={ <TutorProfile /> }
      handle={ { crumb: { name: t('breadCrumbs.myProfile'), path: tutorRoutes.accountMenu.myProfile.route } } }
      path={ tutorRoutes.accountMenu.myProfile.route }
    />
  </Route>
)
