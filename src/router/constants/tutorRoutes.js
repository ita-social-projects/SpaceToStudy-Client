import { authRoutes } from '~/router/constants/authRoutes'

export const tutorRoutes = {
  navBar: {
    categories: { route: 'categories', path: authRoutes.categories.path },
    subjects: { route: 'subjects', path: authRoutes.subjects.path },
    findOffers: { route: 'findOffers', path: authRoutes.findOffers.path }
  }
}
