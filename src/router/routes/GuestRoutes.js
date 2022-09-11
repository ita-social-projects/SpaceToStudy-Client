import { Navigate, Route, Routes } from 'react-router-dom'

import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { errorsRoutes } from '~/router/constants/errorsRoutes'

const GuestRoutes = () => {
  return (
    <Routes>
      <Route element={ <GuestHomePage /> } index />
      <Route element={ <Navigate to={ errorsRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default GuestRoutes
