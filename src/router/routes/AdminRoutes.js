import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Loader from '~/components/loader/Loader'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { adminRoutes } from '~/router/constants/adminRoutes'
import StudentTable from '~/pages/student-table/StudentTable'

const AdminHome = lazy(() => import('~/pages/admin-home/AdminHome'))

const AdminRoutes = () => {
  return (
    <Suspense fallback={ <Loader size={ 70 } /> }>
      <Routes>
        <Route element={ <AdminHome /> } index />
        <Route element={ <StudentTable /> } path={ adminRoutes.students.route } />
        <Route element={ <div>Admins</div> } path={ adminRoutes.admins.route } />
        <Route element={ <div>Tutors</div> } path={ adminRoutes.tutors.route } />
        <Route element={ <div>Complains</div> } path={ adminRoutes.complains.route } />
        <Route element={ <div>Categories</div> } path={ adminRoutes.categories.route } />
        <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
      </Routes>
    </Suspense>
  )
}

export default AdminRoutes
