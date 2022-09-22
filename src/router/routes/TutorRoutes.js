import { Navigate, Route, Routes } from 'react-router-dom'

import TutorHome from '~/pages/tutor-home/TutorHome'
import { errorRoutes } from '~/router/constants/errorRoutes'

const TutorRoutes = () => {
  return (
    <Routes>
      <Route element={ <TutorHome /> } index />
      <Route element={ <Navigate to={ errorRoutes.notFound.path } /> } path='*' />
    </Routes>
  )
}

export default TutorRoutes
