import { t } from 'i18next'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import PrivateRoute from '~/router/helpers/PrivateRoute'

import { studentRoutes } from '~/router/constants/studentRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { student } from '~/constants'

const StudentHome = lazy(() => import('~/pages/student-home/StudentHome'))
const FindTutor = lazy(() => import('~/pages/find-tutor/FindTutor'))
const StudentProfile = lazy(() => import('~/pages/student-profile/StudentProfile'))
const StudentCategories = lazy(()=> import('~/pages/student-categories/StudentCategories'))

export const studentRouter = (
  <Route element={ <PrivateRoute role={ student } /> } path={ guestRoutes.student.route }>
    <Route element={ <StudentHome /> } index />
    <Route
      element={ <FindTutor /> }
      handle={ { crumb: { name: t('breadCrumbs.findTutor'), path: studentRoutes.findTutor.route } } }
      path={ studentRoutes.findTutor.route }
    />
    <Route
      element={ <StudentProfile /> }
      handle={ { crumb: { name: t('breadCrumbs.myProfile'), path: studentRoutes.accountMenu.myProfile.route } } }
      path={ studentRoutes.accountMenu.myProfile.route }
    />
    <Route element={ <StudentCategories /> } path={ studentRoutes.categories.route } />
  </Route>
)
