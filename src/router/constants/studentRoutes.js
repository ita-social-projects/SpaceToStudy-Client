export const studentRoutes = {
  navBar: {
    findTutor: { label: 'findTutor', route: '/student/findTutor', nested: '/findTutor' },
    categories: { label: 'categories', route: '/student/#categories' },
    howItWorks: { label: 'howItWorks', route: '/student/#howItWorks' },
    faq: { label: 'faq', route: '/student/#faq' },
    becomeTutor: { label: 'becomeTutor', route: '/becomeTutor' }
  },
  accountMenu: {
    myProfile: { label: 'myProfile', route: '/student/myProfile', nested: '/myProfile' },
    logout: { label: 'logout', route: '/logout' }
  }
}
