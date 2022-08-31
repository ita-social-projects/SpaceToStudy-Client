import { Navigate, Route, Routes } from 'react-router-dom'

import StudentHome from '~/pages/student-home/StudentHome'
import FindMentor from '~/pages/find-mentor/FindMentor'
import MentorHome from '~/pages/mentor-home/MentorHome'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import { errors, studentRoutes as routes } from '~/constants/routes'

export const StudentRoutes = () => {
  return (
    <Routes>
      <Route element={ <StudentHome /> } index />
      <Route element={ <FindMentor /> } path={ routes.navBar.findMentor.route } />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export const MentorRoutes = () => {
  return (
    <Routes>
      <Route element={ <MentorHome /> } index />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}

export const GuestRoutes = () => {
  return (
    <Routes>
      <Route element={ <GuestHomePage /> } index />
      <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
    </Routes>
  )
}
