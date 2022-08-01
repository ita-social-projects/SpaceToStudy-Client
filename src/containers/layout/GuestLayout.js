import { Route, Routes, Navigate } from 'react-router-dom'

import { routes, errors } from '~/constants/routes'
import Example from '~/pages/home/Home'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import NotFound from '~/pages/error/NotFound'
import InternalServerError from '~/pages/error/InternalServerError'
import AuthPolicy from '~/pages/error/AuthPolicy'
import BadRequest from '~/pages/error/BadRequest'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'

const GuestLayout = () => {
  return (
    <Routes>
      <Route element={ <GuestHomePage /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <AuthPolicy /> } path={ errors.authPolicy.route } />
      <Route element={ <BadRequest /> } path={ errors.badRequest.route } />
      <Route element={ <CookiePolicy /> } name="FindMentor" path={ routes.privacyPolicy.route } />
      <Route element={ <NotFound /> } path={ errors.notFound.route } />
      <Route element={ <InternalServerError /> } path={ errors.internalServerError.route } />
      <Route element={ <Navigate to={ errors.notFound.route }  /> } path='*' />
    </Routes>
  )
}

export default GuestLayout
