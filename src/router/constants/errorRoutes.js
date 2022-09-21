export const errorRoutes = {
  badRequest: { label: 'badRequest', route: '/400' },
  authPolicy: { label: 'authPolicy', route: '/401', path: '/error/401' },
  notFound: { label: 'notFound', route: '/404', path: '/error/404' },
  internalServerError: { label: 'internalServerError', route: '/500' }
}
