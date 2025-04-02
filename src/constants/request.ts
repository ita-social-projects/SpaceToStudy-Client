export const URLs = {
  example: {
    get: '/example'
  },
  location: {
    getCountries: '/location/countries',
    getCitiesByCountryName: '/location/cities/:countryName'
  },
  auth: {
    login: '/auth/login',
    googleAuth: '/auth/google-auth',
    signup: '/auth/signup',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    confirm: '/auth/confirm-email/:token',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password/:token',
    changePassword: '/auth/change-password'
  },
  users: {
    get: '/users',
    getUserById: '/users/:id',
    update: '/users',
    delete: '/users/delete',
    deactivate: '/users/deactivate',
    activate: '/users/activate',
    myProfile: '/users/myProfile',
    bookmarks: '/bookmarks/offers',
    updateBookmarks: '/users/:userId/bookmarks/offers/:offerId',
    offers: '/users/:id/offers'
  },
  offers: {
    create: '/offers',
    update: '/offers',
    updateById: '/offers/:id',
    get: '/categories/subjects/offers',
    getByCategoryAndSubjectId:
      '/categories/:categoryId/subjects/:subjectId/offers',
    getByCategoryId: '/categories/:categoryId/subjects/offers',
    getBySubjectId: '/categories/subjects/:subjectId/offers'
  },
  courses: {
    get: '/courses',
    getById: '/courses/:id',
    delete: '/courses',
    create: '/courses',
    patch: '/courses/:id'
  },
  coursesAndCooperations: {
    getByResourceId: '/courses-cooperations/resource/'
  },
  categories: {
    get: '/categories',
    getNames: '/categories/names',
    priceRange: '/price-range'
  },
  subjects: {
    get: '/subjects',
    getByCategoryId: '/categories/:id/subjects',
    getNames: '/subjects/names',
    getNamesByCategoryId: '/categories/:id/subjects/names'
  },
  cooperations: {
    get: '/cooperations',
    getById: '/cooperations/:id',
    create: '/cooperations',
    update: '/cooperations',
    updateById: '/cooperations/:id',
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
      getById: '/lessons/:id',
      delete: '/lessons/:id',
      patch: '/lessons/:id'
    },
    attachments: {
      get: '/attachments',
      patch: '/attachments/:id',
      delete: '/attachments/:id',
      post: '/attachments'
    },
    questions: {
      get: '/questions',
      getById: '/questions/:id',
      delete: '/questions/:id',
      post: '/questions',
      patch: '/questions/:id'
    },
    resourcesCategories: {
      get: '/resources-categories',
      getNames: '/resources-categories/names',
      patch: '/resources-categories',
      post: '/resources-categories',
      delete: '/resources-categories/:id'
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
    getById: '/quizzes/:id',
    add: '/quizzes',
    patch: '/quizzes/:id',
    delete: '/quizzes/:id'
  },
  finishedQuizzes: {
    add: '/finished-quizzes',
    patch: '/finished-quizzes/:id',
    get: '/finished-quizzes',
    getById: '/finished-quizzes/:id',
    getByQuizId: '/finished-quizzes/:cooperationId/:quizId'
  },
  attachments: {
    post: '/attachments'
  }
} as const
