import { t } from 'i18next'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '~/router/helpers/PrivateRoute'

import { studentRoutes } from '~/router/constants/studentRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { student } from '~/constants'

const StudentHome = lazy(() => import('~/pages/student-home/StudentHome'))
const StudentProfile = lazy(() => import('~/pages/student-profile/StudentProfile'))

export const studentRouter = (
  <Route element={ <PrivateRoute role={ student } /> } path={ guestRoutes.student.route }>
    <Route element={ <StudentHome /> } index />
    <Route
      element={ <StudentProfile /> }
      handle={ { crumb: { name: t('breadCrumbs.myProfile'), path: studentRoutes.accountMenu.myProfile.route } } }
      path={ studentRoutes.accountMenu.myProfile.route }
    />
  </Route>
)
