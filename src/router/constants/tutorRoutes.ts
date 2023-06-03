import { authRoutes } from '~/router/constants/authRoutes'

export const tutorRoutes = {
  navBar: {
    categories: { route: 'categories', path: authRoutes.categories.path }
  },
  accountMenu: {
    myProfile: { route: 'my-profile', path: '/tutor/my-profile' },
    myCooperations: {
      route: 'my-cooperations',
      path: '/tutor/my-cooperations'
    },
    logout: { route: 'logout', path: '/logout' }
  }
}
