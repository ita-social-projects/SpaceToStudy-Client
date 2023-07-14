import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { privacyPolicy } from '~/router/constants/crumbs'
import { guestRoutes } from '~/router/constants/guestRoutes'

const CookiePolicy = lazy(() => import('~/pages/cookie-policy/CookiePolicy'))

export const guestRouter = (
  <Route
    element={<CookiePolicy />}
    handle={{
      crumb: privacyPolicy
    }}
    path={guestRoutes.privacyPolicy.route}
  />
)
