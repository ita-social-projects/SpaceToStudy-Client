import { Route, Routes, Navigate } from 'react-router-dom'

import { errors, routes } from '~/constants/routes'
import NotFound from '~/pages/error/NotFound'
import InternalServerError from '~/pages/error/InternalServerError'
import MentorHome from '~/pages/mentor-home/MentorHome'
import BadRequest from '~/pages/error/BadRequest'
import AuthPolicy from '~/pages/error/AuthPolicy'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'

const MentorLayout = () => {
  return (
    <Routes>
      <Route element={ <MentorHome /> } path={ routes.home.route } />
      <Route element={ <BadRequest /> } path={ errors.badRequest.route } />
      <Route element={ <AuthPolicy /> } path={ errors.authPolicy.route } />
      <Route element={ <CookiePolicy /> } path={ routes.privacyPolicy.route } />
      <Route element={ <NotFound /> } path={ errors.notFound.route } />
      <Route element={ <InternalServerError /> } path={ errors.internalServerError.route } />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export default MentorLayout
