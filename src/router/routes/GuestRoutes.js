import { Route, Routes } from 'react-router-dom'

import GuestHomePage from '~/pages/guest-home-page/GuestHome'

const GuestRoutes = () => {
  return (
    <Routes>
      <Route element={ <GuestHomePage /> } index />
    </Routes>
  )
}

export default GuestRoutes
