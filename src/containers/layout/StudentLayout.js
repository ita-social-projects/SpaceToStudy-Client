import { Route, Routes } from 'react-router-dom'

import { routes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import NotFound from '~/pages/error/NotFound'
import StudentHome from '~/pages/student-home/StudentHome'
import FindMentor from '~/pages/find-mentor/FindMentor'


const StudentLayout = () => {
  return (
    <Routes>
      <Route element={ <StudentHome /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <FindMentor /> } name="FindMentor" path={ routes.findMentor.route } />
      <Route element={ <NotFound /> } path="*" />
    </Routes>
  )
}

export default StudentLayout
