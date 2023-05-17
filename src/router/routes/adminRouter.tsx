import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { adminRoutes } from '~/router/constants/adminRoutes'
import AdminPortal from '~/containers/layout/admin-portal/AdminPortal'

const AdminHome = lazy(() => import('~/pages/admin-home/AdminHome'))
const StudentTable = lazy(() => import('~/pages/student-table/StudentTable'))
const TutorTable = lazy(() => import('~/pages/tutor-table/TutorTable'))
const AdminTable = lazy(() => import('~/pages/admin-table/AdminTable'))

export const adminRouter = (
  <Route element={<AdminPortal />}>
    <Route element={<AdminHome />} index />
    <Route element={<StudentTable />} path={adminRoutes.students.route} />
    <Route element={<TutorTable />} path={adminRoutes.tutors.route} />
    <Route element={<AdminTable />} path={adminRoutes.admins.route} />
    <Route element={<div>Complains</div>} path={adminRoutes.complains.route} />
    <Route
      element={<div>Categories</div>}
      path={adminRoutes.categories.route}
    />
  </Route>
)
