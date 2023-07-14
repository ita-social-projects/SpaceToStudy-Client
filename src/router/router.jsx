import { lazy } from 'react'
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import App from '~/App'
import AppContent from '~/containers/app-content/AppContent'
import { authRoutes } from '~/router/constants/authRoutes'
import { home } from '~/router/constants/crumbs'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { authRouter } from '~/router/routes/authRouter'
import { errorRouter } from '~/router/routes/errorRouter'
import { guestRouter } from '~/router/routes/guestRouter'
import { studentRouter } from '~/router/routes/studentRouter'
import { tutorRouter } from '~/router/routes/tutorRouter'

const HomeRoute = lazy(() => import('~/router/helpers/HomeRoute'))
const Logout = lazy(() => import('~/pages/logout/Logout'))

export const routerConfig = (
  <Route
    element={<App />}
    errorElement={<Navigate to={errorRoutes.notFound.path} />}
    path={guestRoutes.home.route}
  >
    <Route element={<AppContent />} handle={{ crumb: home }}>
      <Route element={<HomeRoute />} index />
      {guestRouter}
      {authRouter}
      {tutorRouter}
      {studentRouter}
      <Route path={guestRoutes.error.route}>{errorRouter}</Route>
      <Route element={<Logout />} path={authRoutes.accountMenu.logout.route} />
    </Route>
  </Route>
)

export const router = createBrowserRouter(
  createRoutesFromElements(routerConfig)
)
