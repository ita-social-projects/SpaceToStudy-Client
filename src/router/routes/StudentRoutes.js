import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'

const StudentHome = lazy(() => import('~/pages/student-home/StudentHome'))
const FindTutor = lazy(() => import('~/pages/find-tutor/FindTutor'))
const StudentProfile = lazy(() => import('~/pages/student-profile/StudentProfile'))

const StudentRoutes = () => {
  return (
    <Suspense fallback={ <Loader size={ 70 } /> }>
      <Routes>
        <Route element={ <StudentHome /> } index />
        <Route element={ <FindTutor /> } path={ studentRoutes.navBar.findTutor.nested } />
        <Route element={ <StudentProfile /> } path={ studentRoutes.accountMenu.myProfile.nested } />
        <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
      </Routes>
    </Suspense>
  )
}

export default StudentRoutes
