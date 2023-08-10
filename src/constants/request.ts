export const URLs = {
  example: {
    get: '/example'
  },
  location: {
    getCountries: '/location/countries',
    getCities: 'location/cities'
  },
  auth: {
    login: '/auth/login',
    googleAuth: '/auth/google-auth',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    confirm: '/auth/confirm-email',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password'
  },
  users: {
    get: '/users',
    update: '/users',
    delete: '/users/delete',
    myProfile: '/users/myProfile'
  },
  offers: {
    create: '/offers',
    update: '/offers',
    get: '/offers'
  },
  categories: {
    get: '/categories',
    getNames: '/categories/names',
    priceRange: '/price-range'
  },
  subjects: {
    get: '/subjects',
    getNames: '/subjects/names'
  },
  cooperations: {
    get: '/cooperations',
    create: '/cooperations',
    update: '/cooperations'
  },
  chats: {
    get: '/chats'
  },
  resources: {
    lessons: {
      get: '/lessons',
      delete: '/lessons',
      patch: '/lessons'
    },
    attachments: {
      get: '/attachments'
    }
  },
  messages: {
    get: '/messages',
    post: '/messages'
  }
}
