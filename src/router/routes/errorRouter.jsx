import { lazy } from 'react'
import { Route } from 'react-router-dom'

import { errorRoutes } from '~/router/constants/errorRoutes'

const AuthPolicy = lazy(() => import('~/pages/error/AuthPolicy'))
const BadRequest = lazy(() => import('~/pages/error/BadRequest'))
const InternalServerError = lazy(() =>
  import('~/pages/error/InternalServerError')
)
const NotFound = lazy(() => import('~/pages/error/NotFound'))

export const errorRouter = (
  <>
    <Route element={<BadRequest />} path={errorRoutes.badRequest.route} />
    <Route element={<AuthPolicy />} path={errorRoutes.authPolicy.route} />
    <Route element={<NotFound />} path={errorRoutes.notFound.route} />
    <Route
      element={<InternalServerError />}
      path={errorRoutes.internalServerError.route}
    />
  </>
)
