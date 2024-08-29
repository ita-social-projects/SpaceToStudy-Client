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
    resetPassword: '/auth/reset-password',
    changePassword: '/auth/change-password'
  },
  users: {
    get: '/users',
    update: '/users',
    delete: '/users/delete',
    deactivate: '/users/deactivate',
    activate: '/users/activate',
    myProfile: '/users/myProfile',
    bookmarks: '/bookmarks/offers'
  },
  offers: {
    create: '/offers',
    update: '/offers',
    get: '/offers'
  },
  courses: {
    get: '/courses',
    delete: '/courses',
    create: '/courses',
    patch: '/courses'
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
    getById: '/cooperations/id',
    create: '/cooperations',
    update: '/cooperations',
    delete: '/cooperations'
  },
  notes: {
    get: '/notes',
    create: '/notes',
    update: '/notes',
    delete: '/notes'
  },
  chats: {
    get: '/chats',
    create: '/chats',
    delete: '/chats',
    patch: '/chats'
  },
  resources: {
    lessons: {
      add: '/lessons',
      get: '/lessons',
      delete: '/lessons',
      patch: '/lessons'
    },
    attachments: {
      get: '/attachments',
      patch: '/attachments',
      delete: '/attachments'
    },
    questions: {
      get: '/questions',
      delete: '/questions',
      post: '/questions',
      patch: '/questions'
    },
    resourcesCategories: {
      get: '/resources-categories',
      getNames: '/resources-categories/names',
      patch: '/resources-categories',
      post: '/resources-categories',
      delete: 'resources-categories'
    }
  },
  messages: {
    get: '/messages',
    post: '/messages',
    delete: '/messages',
    patch: '/messages'
  },
  quizzes: {
    get: '/quizzes',
    add: '/quizzes',
    patch: '/quizzes',
    delete: '/quizzes'
  },
  attachments: {
    post: '/attachments'
  }
}
