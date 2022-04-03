import { Route, Routes } from 'react-router-dom'
import { routes } from '~/constants/routes'
import Home from '~/pages/home/Home'
import About from '~/pages/about/About'

const AppMain = () => {
  return (
    <Routes>
      <Route element={ <Home /> } path={ routes.home } />
      <Route element={ <About /> } name="home" path={ routes.about } />
    </Routes>
  )
}

export default AppMain
