import { Route, Routes, Navigate } from 'react-router-dom'

import InternalServerError from '~/pages/error/InternalServerError'
import NotFound from '~/pages/error/NotFound'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'
import BadRequest from '~/pages/error/BadRequest'
import AuthPolicy from '~/pages/error/AuthPolicy'
import { AsyncNavigator } from './helpers/AsyncNavigator'
import { GuestNavigator } from './helpers/GuestNavigator'
import { errors, routes } from '~/constants/routes'
import { mentor, student } from '~/constants'
import { mentorRoutes, studentRoutes } from './routes'

const AppRouter = ({ userRole }) => {
  const privateRoutes = userRole && (
    <>
      <Route element={ <AsyncNavigator to={ `/${userRole}` } /> } path={ routes.home.route } />
      <Route path={ routes.student.route }>
        { studentRoutes }
      </Route>
      <Route path={ routes.mentor.route }>
        { mentorRoutes }
      </Route>
    </>
  )

  return (
    <Routes>
      { privateRoutes }
      <Route element={ <GuestNavigator /> } path={ routes.home.route } />
      <Route element={ <AsyncNavigator role={ student } to={ routes.home.route } /> } path={ routes.student.nested } />
      <Route element={ <AsyncNavigator role={ mentor } to={ routes.home.route } /> } path={ routes.mentor.nested } />
      <Route element={ <BadRequest /> } path={ errors.badRequest.route } />
      <Route element={ <AuthPolicy /> } path={ errors.authPolicy.route } />
      <Route element={ <CookiePolicy /> } path={ routes.privacyPolicy.route } />
      <Route element={ <NotFound /> } path={ errors.notFound.route } />
      <Route element={ <InternalServerError /> } path={ errors.internalServerError.route } />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export default AppRouter
