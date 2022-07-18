import { Route, Routes } from 'react-router-dom'

import { errors, routes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import NotFound from '~/pages/error/NotFound'
import MentorHome from '~/pages/mentor-home/MentorHome'
import BadRequest from '~/pages/error/BadRequest'


const MentorLayout = () => {
  return (
    <Routes>
      <Route element={ <MentorHome /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <BadRequest /> } path={ errors.badRequest.route } />
      <Route element={ <NotFound /> } path="*" />
    </Routes>
  )
}

export default MentorLayout
