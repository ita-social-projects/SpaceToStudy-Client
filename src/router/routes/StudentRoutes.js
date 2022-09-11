import { Navigate, Route, Routes } from 'react-router-dom'

import { errorsRoutes } from '~/router/constants/errorsRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import StudentHome from '~/pages/student-home/StudentHome'
import FindMentor from '~/pages/find-mentor/FindMentor'

const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={ <StudentHome /> } index />
      <Route element={ <FindMentor /> } path={ studentRoutes.navBar.findMentor.path } />
      <Route element={ <Navigate to={ errorsRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default StudentRoutes
