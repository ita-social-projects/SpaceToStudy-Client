import { t } from 'i18next'
import { lazy } from 'react'
import { Route } from 'react-router-dom'
import { guestRoutes } from '../constants/guestRoutes'
import { categories } from '../constants/crumbs'
import { subjects } from '../constants/crumbs'
import { findOffers } from '../constants/crumbs'

const CookiePolicy = lazy(() => import('~/pages/cookie-policy/CookiePolicy'))
const Subjects = lazy(()=> import('~/pages/subjects/Subjects'))
const Categories = lazy(()=> import('~/pages/categories/Categories'))
const FindOffers = lazy(()=> import('~/pages/find-offers/FindOffers'))

export const guestRouter = (
  <Route>
    <Route
      element={ <CookiePolicy /> }
      handle={ { crumb: { name: t('breadCrumbs.privacyPolicy'), path: guestRoutes.privacyPolicy.route } } }
      path={ guestRoutes.privacyPolicy.route }
    />
    <Route
      element={ <Categories /> } 
      handle={ { crumb: categories } } 
      path={ guestRoutes.categories.route }
    />
    <Route
      element={ <Subjects /> } 
      handle={  { crumb: [ categories , subjects ] } } 
      path={ guestRoutes.subjects.route }
    />
    <Route
      element={ <FindOffers /> } 
      handle={ { crumb: [ categories , subjects, findOffers ] } } 
      path={ guestRoutes.findOffers.route }
    />
  </Route>
)
