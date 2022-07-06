import { Route, Routes } from 'react-router-dom'

import { routes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import NotFound from '~/pages/error/NotFound'
import InternalServerError from '~/pages/error/InternalServerError'
import AuthPolicy from '~/pages/error/AuthPolicy'

const GuestLayout = () => {
  return (
    <Routes>
      <Route element={ <GuestHomePage /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <AuthPolicy /> } path="/401" />
      <Route element={ <NotFound /> } path="/404" />
      <Route element={ <InternalServerError /> } path="/500" />
    </Routes>
  )
}

export default GuestLayout
