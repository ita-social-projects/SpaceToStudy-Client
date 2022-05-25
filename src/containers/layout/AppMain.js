import { Route, Routes } from 'react-router-dom'

import { routes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import GuestHomePage from '~/pages/guest-home-page/GuestHome'
import NotFound from '~/pages/error/NotFound'


const AppMain = () => {
  return (
    <Routes>
      <Route element={ <GuestHomePage /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <NotFound /> } path="*" />
    </Routes>
  )
}

export default AppMain
