import { Navigate, Route, Routes } from 'react-router-dom'

import MentorHome from '~/pages/mentor-home/MentorHome'
import { errorRoutes } from '~/router/constants/errorRoutes'

const MentorRoutes = () => {
  return (
    <Routes>
      <Route element={ <MentorHome /> } index />
      <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default MentorRoutes
