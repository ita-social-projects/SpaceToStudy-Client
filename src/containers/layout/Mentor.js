import { Route, Routes } from 'react-router-dom'

import { routes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import NotFound from '~/pages/error/NotFound'
import MentorHome from '~/pages/mentor-home/MentorHome'


const Mentor = () => {
  return (
    <Routes>
      <Route element={ <MentorHome /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <NotFound /> } path="*" />
    </Routes>
  )
}

export default Mentor
