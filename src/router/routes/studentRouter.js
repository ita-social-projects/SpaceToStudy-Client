import { t } from 'i18next'
import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { studentRoutes } from '~/router/constants/studentRoutes'

const StudentHome = lazy(() => import('~/pages/student-home/StudentHome'))
const FindTutor = lazy(() => import('~/pages/find-tutor/FindTutor'))
const StudentProfile = lazy(() => import('~/pages/student-profile/StudentProfile'))

export const studentRouter = (
  <>
    <Route element={ <StudentHome /> } index />
    <Route
      element={ <FindTutor /> }
      handle={ { crumb: { name: t('breadCrumbs.findTutor'), path: studentRoutes.navBar.findTutor.route } } }
      path={ studentRoutes.navBar.findTutor.route }
    />
    <Route
      element={ <StudentProfile /> }
      handle={ { crumb: { name: t('breadCrumbs.myProfile'), path: studentRoutes.navBar.findTutor.route } } }
      path={ studentRoutes.accountMenu.myProfile.route }
    />
  </>
)
