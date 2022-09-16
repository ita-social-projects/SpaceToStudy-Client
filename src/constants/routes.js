export const routes = {
  home: { route: '/', nested: '//*' },
  error: { nested: '/error/*' },
  student: { route: '/student', nested: '/student/*' },
  mentor: { route: '/mentor', nested: '/mentor/*' },
  about: { label: 'about', route: '/about' },
  privacyPolicy: { label: 'privacyPolicy', route: '/privacyPolicy' },
  termOfUse: { label: 'termOfUse', route: '/termOfUse' },
  guestNavBar: {
    whatCanYouDo: { label: 'whatCanYouDo', route: '/#whatCanYouDo' },
    howItWorks: { label: 'howItWorks', route: '/#howItWorks' },
    whoWeAre: { label: 'whoWeAre', route: '/#whoWeAre' }
  }
}

export const studentRoutes = {
  navBar: {
    findMentor: { label: 'findMentor', route: 'findMentor' },
    categories: { label: 'categories', route: '/#categories' },
    howItWorks: { label: 'howItWorks', route: '/#howItWorks' },
    faq: { label: 'faq', route: '/#faq' },
    becomeMentor: { label: 'becomeMentor', route: '/becomeMentor' }
  },
  accountMenu: {
    logout: { label: 'logout', route: '/logout' }
  }
}

export const errors = {
  badRequest: { label: 'badRequest', route: '/400' },
  authPolicy: { label: 'authPolicy', route: '/401', path: '/error/401' },
  notFound: { label: 'notFound', route: '/404', path: '/error/404' },
  internalServerError: { label: 'internalServerError', route: '/500' }
}
