import { Navigate, Route, Routes } from 'react-router-dom'

import AdminHome from '~/pages/admin-home/AdminHome'
import { errors } from '~/constants/routes'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route element={ <AdminHome /> } index />
      <Route element={ <Navigate to={ errors.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default AdminRoutes
