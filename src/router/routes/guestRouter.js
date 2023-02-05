import { t } from 'i18next'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { guestRoutes } from '../constants/guestRoutes'

const CookiePolicy = lazy(() => import('~/pages/cookie-policy/CookiePolicy'))

export const guestRouter = (
  <Route
    element={ <CookiePolicy /> }
    handle={ { crumb: { name: t('breadCrumbs.privacyPolicy'), path: guestRoutes.privacyPolicy.route } } }
    path={ guestRoutes.privacyPolicy.route }
  />
)
