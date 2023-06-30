import { lazy } from 'react'
import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements
} from 'react-router-dom'

import App from '~/App'
import AppContent from '~/containers/app-content/AppContent'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { authRoutes } from '~/router/constants/authRoutes'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { tutorRouter } from '~/router/routes/tutorRouter'
import { errorRouter } from '~/router/routes/errorRouter'
import { studentRouter } from '~/router/routes/studentRouter'
import { adminRouter } from '~/router/routes/adminRouter'
import { guestRouter } from '~/router/routes/guestRouter'
import { authRouter } from '~/router/routes/authRouter'
import PrivateRoute from '~/router/helpers/PrivateRoute'
import { UserRoleEnum } from '~/types'
import { home } from '~/router/constants/crumbs'

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
    <Route
      element={<PrivateRoute role={[UserRoleEnum.Admin]} />}
      path={guestRoutes.admin.route}
    >
      {adminRouter}
    </Route>
  </Route>
)

export const router = createBrowserRouter(
  createRoutesFromElements(routerConfig)
)
