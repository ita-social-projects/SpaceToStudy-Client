export const routes = {
  home: { label: 'home', route: '/' },
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
  }
}

export const errors = {
  badRequest: { label: 'badRequest', route: '/400' },
  authPolicy: { label: 'authPolicy', route: '/401' },
  notFound: { label: 'notFound', route: '/404' },
  internalServerError: { label: 'internalServerError', route: '/500' }
}
