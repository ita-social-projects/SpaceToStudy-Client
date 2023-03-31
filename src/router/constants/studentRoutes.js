import { guestRoutes } from '~/router/constants/guestRoutes'

export const studentRoutes = {
  navBar: {
    categories: { route: 'categories', path: guestRoutes.categories.route },
    howItWorks: { route: 'howItWorks', path: '/student/#howItWorks' },
    faq: { route: 'faq', path: '/student/#faq' }
  },
  accountMenu: {
    myProfile: { route: 'myProfile', path: '/student/myProfile' },
    logout: { route: 'logout', path: '/logout' }
  }
}
