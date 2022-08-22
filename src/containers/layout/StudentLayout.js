import { Route, Routes, Navigate } from 'react-router-dom'

import { errors, routes, studentRoutes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import NotFound from '~/pages/error/NotFound'
import StudentHome from '~/pages/student-home/StudentHome'
import FindMentor from '~/pages/find-mentor/FindMentor'
import BadRequest from '~/pages/error/BadRequest'
import InternalServerError from '~/pages/error/InternalServerError'
import AuthPolicy from '~/pages/error/AuthPolicy'
import CookiePolicy from '~/pages/cookie-policy/CookiePolicy'

const StudentLayout = () => {
  return (
    <Routes>
      <Route element={ <StudentHome /> } path={ routes.home.route } />
      <Route element={ <Example /> } name='home' path={ routes.about.route } />
      <Route element={ <FindMentor /> } name='FindMentor' path={ studentRoutes.navBar.findMentor.route } />
      <Route element={ <BadRequest /> } path={ errors.badRequest.route } />
      <Route element={ <AuthPolicy /> } path={ errors.authPolicy.route } />
      <Route element={ <CookiePolicy /> } path={ routes.privacyPolicy.route } />
      <Route element={ <NotFound /> } path={ errors.notFound.route } />
      <Route element={ <InternalServerError /> } path={ errors.internalServerError.route } />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export default StudentLayout
