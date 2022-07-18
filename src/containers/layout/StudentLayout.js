import { Route, Routes } from 'react-router-dom'

import { errors, routes, studentRoutes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import NotFound from '~/pages/error/NotFound'
import StudentHome from '~/pages/student-home/StudentHome'
import FindMentor from '~/pages/find-mentor/FindMentor'
import BadRequest from '~/pages/error/BadRequest'

const StudentLayout = () => {
  return (
    <Routes>
      <Route element={ <StudentHome /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <FindMentor /> } name="FindMentor" path={ studentRoutes.navBar.findMentor.route } />
      <Route element={ <BadRequest /> } path={ errors.badRequest.route } />
      <Route element={ <NotFound /> } path="*" />
    </Routes>
  )
}

export default StudentLayout
