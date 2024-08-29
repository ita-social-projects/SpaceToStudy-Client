export const authRoutes = {
  categories: { route: 'categories', path: '/categories' },
  subjects: { route: 'categories/subjects', path: '/categories/subjects' },
  chat: { route: 'chat', path: '/chat' },
  userProfile: { route: 'user/:id', path: '/user' },
  findOffers: {
    route: 'categories/subjects/find-offers',
    path: '/categories/subjects/find-offers'
  },
  offerDetails: { route: 'offer-details/:id', path: '/offer-details' },
  bookmarkedOffers: { route: 'bookmarked-offers', path: '/bookmarked-offers' },
  cooperationDetails: {
    route: 'my-cooperations/:id',
    path: '/my-cooperations'
  },
  myResources: {
    root: { route: 'my-resources', path: '/my-resources' },
    newLesson: {
      route: 'my-resources/new-lesson',
      path: '/my-resources/new-lesson'
    },
    editLesson: {
      route: 'my-resources/edit-lesson/:id',
      path: '/my-resources/edit-lesson'
    },
    newQuiz: {
      route: 'my-resources/new-quiz',
      path: '/my-resources/new-quiz'
    },
    editQuiz: {
      route: 'my-resources/edit-quiz/:id',
      path: '/my-resources/edit-quiz'
    },
    newQuestion: {
      route: 'my-resources/new-question',
      path: '/my-resources/new-question'
    },
    editQuestion: {
      route: 'my-resources/edit-question/:id',
      path: '/my-resources/edit-question'
    }
  },
  lessonDetails: { route: 'lesson-details/:lessonId', path: '/lesson-details' },
  cooperationLessonDetails: {
    route: 'my-cooperations/:id/lesson-details/:lessonId'
  },
  cooperationQuiz: {
    route: 'my-cooperations/:id/quiz/:quizId'
  },
  accountMenu: {
    myProfile: { route: 'my-profile', path: '/my-profile' },
    bookmarks: { route: 'bookmarked-offers', path: '/bookmarked-offers' },
    myCooperations: {
      route: 'my-cooperations',
      path: '/my-cooperations'
    },
    myOffers: {
      route: 'my-offers',
      path: '/my-offers'
    },
    logout: { route: 'logout', path: '/logout' }
  },
  editProfile: {
    route: 'my-profile/edit',
    path: '/my-profile/edit'
  },
  myCourses: {
    root: { route: 'my-courses', path: '/my-courses' },
    newCourse: {
      route: 'my-courses/new-course',
      path: '/my-courses/new-course'
    },
    editCourse: {
      route: 'my-courses/new-course/:id',
      path: '/my-courses/new-course'
    }
  }
}
