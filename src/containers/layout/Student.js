import { Route, Routes } from 'react-router-dom'

import { routes } from '~/constants/routes'
import Example from '~/pages/home/Home'
import NotFound from '~/pages/error/NotFound'
import Home from '~/pages/home/Home'


const Student = () => {
  return (
    <Routes>
      <Route element={ <Home /> } path={ routes.home.route } />
      <Route element={ <Example /> } name="home" path={ routes.about.route } />
      <Route element={ <NotFound /> } path="*" />
    </Routes>
  )
}

export default Student
