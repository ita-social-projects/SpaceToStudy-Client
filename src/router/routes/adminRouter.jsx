import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { adminRoutes } from '~/router/constants/adminRoutes'
import AdminPortal from '~/containers/layout/admin-portal/AdminPortal'

const AdminHome = lazy(() => import('~/pages/admin-home/AdminHome'))
const StudentTable = lazy(() => import('~/pages/student-table/StudentTable'))

export const adminRouter = (
  <Route element={ <AdminPortal /> }>
    <Route element={ <AdminHome /> } index />
    <Route element={ <StudentTable /> } path={ adminRoutes.students.route } />
    <Route element={ <div>Admins</div> } path={ adminRoutes.admins.route } />
    <Route element={ <div>Tutors</div> } path={ adminRoutes.tutors.route } />
    <Route element={ <div>Complains</div> } path={ adminRoutes.complains.route } />
    <Route element={ <div>Categories</div> } path={ adminRoutes.categories.route } />
  </Route>
)
