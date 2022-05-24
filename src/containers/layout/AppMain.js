import { Route, Routes } from 'react-router-dom'

import { routes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import GuestHomePage from '~/pages/guest-home-page/GuestHomePage'
import NotFound from '~/pages/error/NotFound'
import StudentHome from '~/pages/home/StudentHome'
import MentorHome from '~/pages/home/MentorHome'


const AppMain = () => {
  return (
    <Routes>
      <Route element={ <GuestHomePage /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <StudentHome /> } name="studenHome" path={ routes.studentHome.route } />
      <Route element={ <MentorHome /> } name="mentorHome" path={ routes.mentorHome.route } />
      <Route element={ <NotFound /> } path="*" />
    </Routes>
  )
}

export default AppMain
