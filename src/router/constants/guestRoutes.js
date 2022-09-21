export const guestRoutes = {
  home: { route: '/', nested: '//*' },
  error: { nested: '/error/*' },
  student: { route: '/student', nested: '/student/*' },
  mentor: { route: '/mentor', nested: '/mentor/*' },
  admin: { route: '/admin', nested: '/admin/*' },
  about: { label: 'about', route: '/about' },
  privacyPolicy: { label: 'privacyPolicy', route: '/privacyPolicy' },
  termOfUse: { label: 'termOfUse', route: '/termOfUse' },
  navBar: {
    whatCanYouDo: { label: 'whatCanYouDo', route: '/#whatCanYouDo' },
    howItWorks: { label: 'howItWorks', route: '/#howItWorks' },
    whoWeAre: { label: 'whoWeAre', route: '/#whoWeAre' }
  }
}
