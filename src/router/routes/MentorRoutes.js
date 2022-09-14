import { Navigate, Route, Routes } from 'react-router-dom'

import MentorHome from '~/pages/mentor-home/MentorHome'
import { errors } from '~/constants/routes'

const MentorRoutes = () => {
  return (
    <Routes>
      <Route element={ <MentorHome /> } index />
      <Route element={ <Navigate to={ errors.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default MentorRoutes
