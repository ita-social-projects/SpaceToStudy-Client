export const authRoutes = {
  categories: { route: 'categories', path: '/categories' },
  subjects: { route: 'categories/subjects', path: '/categories/subjects' },
  findOffers: {
    route: 'categories/subjects/findOffers',
    path: '/categories/subjects/findOffers'
  },
  offerDetails: { route: 'offerDetails/:id', path: 'offerDetails/:id' }
}
