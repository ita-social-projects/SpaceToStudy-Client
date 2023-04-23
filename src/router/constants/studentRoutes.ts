import { authRoutes } from '~/router/constants/authRoutes'

export const studentRoutes = {
  navBar: {
    categories: { route: 'categories', path: authRoutes.categories.path },
    howItWorks: { route: 'howItWorks', path: '/student/#howItWorks' },
    faq: { route: 'faq', path: '/student/#faq' }
  },
  accountMenu: {
    myProfile: { route: 'myProfile', path: '/student/myProfile' },
    logout: { route: 'logout', path: '/logout' }
  }
}
