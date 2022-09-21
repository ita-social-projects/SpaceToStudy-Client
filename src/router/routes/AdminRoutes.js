import { Navigate, Route, Routes } from 'react-router-dom'

import AdminHome from '~/pages/admin-home/AdminHome'
import { errorRoutes } from '~/router/constants/errorRoutes'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={ <AdminHome /> } index />
      <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default AdminRoutes
