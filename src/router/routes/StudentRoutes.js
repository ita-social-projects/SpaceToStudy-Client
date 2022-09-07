import { Navigate, Route, Routes } from 'react-router-dom'

import { errors, studentRoutes as routes } from '~/constants/routes'
import StudentHome from '~/pages/student-home/StudentHome'
import FindMentor from '~/pages/find-mentor/FindMentor'

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={ <StudentHome /> } index />
      <Route element={ <FindMentor /> } path={ routes.navBar.findMentor.route } />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export default StudentRoutes
