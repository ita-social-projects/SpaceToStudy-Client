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
    newQuestion: {
      route: 'my-resources/new-question',
      path: '/my-resources/new-question'
    }
  },
  lessonDetails: { route: 'lesson-details/:id', path: '/lesson-details' },
  accountMenu: {
    myProfile: { route: 'my-profile', path: '/my-profile' },
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
  }
}
