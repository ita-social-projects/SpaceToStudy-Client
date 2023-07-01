import { authRoutes } from '~/router/constants/authRoutes'

export const studentRoutes = {
  navBar: {
    categories: { route: 'categories', path: authRoutes.categories.path },
    howItWorks: { route: 'how-it-works', path: '/student/#how-it-works' },
    faq: { route: 'faq', path: '/student/#faq' }
  },
  accountMenu: {
    myProfile: { route: 'my-profile', path: '/student/my-profile' },
    myCooperations: {
      route: 'my-cooperations',
      path: '/student/my-cooperations'
    },
    myOffers: {
      route: 'my-offers',
      path: '/student/my-offers'
    },
    logout: { route: 'logout', path: '/logout' }
  },
  editProfile: {
    route: 'my-profile/edit',
    path: '/student/my-profile/edit'
  }
}
