import { lazy } from 'react'
import { Route } from 'react-router-dom'

import PrivateRoute from '~/router/helpers/PrivateRoute'
import { categories } from '~/router/constants/crumbs'
import { subjects } from '~/router/constants/crumbs'
import { findOffers } from '~/router/constants/crumbs'
import { authRoutes } from '~/router/constants/authRoutes'
import { UserRoleEnum } from '~/types'

const Subjects = lazy(() => import('~/pages/subjects/Subjects'))
const Categories = lazy(() => import('~/pages/categories/Categories'))
const FindOffers = lazy(() => import('~/pages/find-offers/FindOffers'))

export const authRouter = (
  <Route
    element={<PrivateRoute role={[UserRoleEnum.Student, UserRoleEnum.Tutor]} />}
  >
    <Route
      element={<Categories />}
      handle={{ crumb: categories }}
      path={authRoutes.categories.route}
    />
    <Route
      element={<Subjects />}
      handle={{ crumb: [categories, subjects] }}
      path={authRoutes.subjects.route}
    />
    <Route
      element={<FindOffers />}
      handle={{ crumb: [categories, subjects, findOffers] }}
      path={authRoutes.findOffers.route}
    />
  </Route>
)
