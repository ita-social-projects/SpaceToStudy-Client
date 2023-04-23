export const errorRoutes = {
  badRequest: { route: '400' },
  internalServerError: { route: '500' },
  authPolicy: { route: '401', path: '/error/401' },
  notFound: { route: '404', path: '/error/404' }
}
