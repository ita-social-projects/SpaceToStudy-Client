import { Navigate, Route, Routes } from 'react-router-dom'

import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { errors } from '~/constants/routes'

const GuestRoutes = () => {
  return (
    <Routes>
      <Route element={ <GuestHomePage /> } index />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export default GuestRoutes
