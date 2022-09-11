import { Navigate, Route, Routes } from 'react-router-dom'

import MentorHome from '~/pages/mentor-home/MentorHome'
import { errorsRoutes } from '~/router/constants/errorsRoutes'

const MentorRoutes = () => {
  return (
    <Routes>
      <Route element={ <MentorHome /> } index />
      <Route element={ <Navigate to={ errorsRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default MentorRoutes
