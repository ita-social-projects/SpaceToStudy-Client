import { authRoutes } from '~/router/constants/authRoutes'

export const studentRoutes = {
  navBar: {
    categories: { route: 'categories', path: authRoutes.categories.path },
    howItWorks: { route: 'how-it-works', path: '/student/#how-it-works' },
    faq: { route: 'faq', path: '/student/#faq' }
  }
}
