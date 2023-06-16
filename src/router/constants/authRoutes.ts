export const authRoutes = {
  categories: { route: 'categories', path: '/categories' },
  subjects: { route: 'categories/subjects', path: '/categories/subjects' },
  userProfile: { route: 'user/:id', path: '/user' },
  findOffers: {
    route: 'categories/subjects/find-offers',
    path: '/categories/subjects/find-offers'
  },
  offerDetails: { route: 'offer-details/:id', path: '/offer-details' }
}
