import { Navigate, Route } from 'react-router-dom'

import StudentHome from '~/pages/student-home/StudentHome'
import FindMentor from '~/pages/find-mentor/FindMentor'
import MentorHome from '~/pages/mentor-home/MentorHome'
import { errors, studentRoutes as routes } from '~/constants/routes'

export const studentRoutes = (
  <>
    <Route element={ <StudentHome /> } index />
    <Route element={ <FindMentor /> } path={ routes.navBar.findMentor.route } />
    <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
  </>
)

export const mentorRoutes = (
  <>
    <Route element={ <MentorHome /> } index />
    <Route element={ <Navigate to={ errors.notFound.route } /> } path='*' />
  </>
)
