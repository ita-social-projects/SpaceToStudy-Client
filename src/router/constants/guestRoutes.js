export const guestRoutes = {
  home: { path: '/', nested: '//*' },
  student: { path: '/student', nested: '/student/*' },
  mentor: { path: '/mentor', nested: '/mentor/*' },
  about: { label: 'about', path: '/about' },
  privacyPolicy: { label: 'privacyPolicy', path: '/privacyPolicy' },
  termOfUse: { label: 'termOfUse', path: '/termOfUse' },
  guestNavBar: {
    whatCanYouDo: { label: 'whatCanYouDo', path: '/#whatCanYouDo' },
    howItWorks: { label: 'howItWorks', path: '/#howItWorks' },
    whoWeAre: { label: 'whoWeAre', path: '/#whoWeAre' }
  }
}
