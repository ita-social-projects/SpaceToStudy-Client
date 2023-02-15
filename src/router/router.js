import { lazy } from 'react'
import { Route, Navigate, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { t } from 'i18next'

import App from '~/App'
import AppContent from '~/containers/app-content/AppContent'
import { guestRoutes } from '~/router/constants/guestRoutes'
import { studentRoutes } from '~/router/constants/studentRoutes'
import { errorRoutes } from '~/router/constants/errorRoutes'
import { tutorRouter } from '~/router/routes/tutorRouter'
import { errorRouter } from '~/router/routes/errorRouter'
import { studentRouter } from '~/router/routes/studentRouter'
import { adminRouter } from '~/router/routes/adminRouter'
import { guestRouter } from '~/router/routes/guestRouter'
import PrivateRoute from '~/router/helpers/PrivateRoute'
import GuestRoute from '~/router/helpers/GuestRoute'
import { admin } from '~/constants'

const Logout = lazy(() => import('~/pages/logout/Logout'))

export const routerConfig = (
  <Route element={ <App /> } errorElement={ <Navigate to={ errorRoutes.notFound.path } /> } path={ guestRoutes.home.route }>
    <Route element={ <AppContent /> } handle={ { crumb: { name: t('breadCrumbs.home'), path: guestRoutes.home.route } } }>
      <Route element={ <GuestRoute /> } index />
      { guestRouter }
      { tutorRouter }
      { studentRouter }
      <Route path={ guestRoutes.error.route }>
        { errorRouter }
      </Route>
      <Route element={ <Logout /> } path={ studentRoutes.accountMenu.logout.route } />
    </Route>
    <Route element={ <PrivateRoute role={ admin } /> } path={ guestRoutes.admin.route }>
      { adminRouter }
    </Route>
  </Route>
)

export const router = createBrowserRouter(createRoutesFromElements(routerConfig))
