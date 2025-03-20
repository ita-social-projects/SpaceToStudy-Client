// export const responseMock = {
//   user: {
//     _id: '6406eec81826f1e46fb6e05c',
//     role: ['student', 'tutor'],
//     firstName: 'ffffff',
//     lastName: 'fffff',
//     email: 'nataha-backend-queen@gmail.com',
//     categories: [],
//     totalReviews: 0,
//     averageRating: 3,
//     isEmailConfirmed: true,
//     isFirstLogin: true,
//     lastLogin: null,
//     lastLoginAs: 'student',
//     bookmarkedOffers: [],
//     createdAt: '2023-03-07T07:59:04.615Z',
//     updatedAt: '2023-03-07T07:59:04.615Z',
//     reviewStats: {
//       reviews: [
//         {
//           count: 1,
//           rating: 1
//         },
//         {
//           count: 1,
//           rating: 3
//         },
//         {
//           count: 3,
//           rating: 5
//         },
//         {
//           count: 2,
//           rating: 4
//         }
//       ],
//       totalReviews: 7,
//       averageRating: 3.8
//     }
//   }
// }

export const mockUserResponse = {
  _id: '6406eec81826f1e46fb6e05c',
  role: ['student', 'tutor'],
  firstName: 'ffffff',
  lastName: 'fffff',
  email: 'nataha-backend-queen@gmail.com',
  categories: [],
  totalReviews: 0,
  averageRating: 3,
  isEmailConfirmed: true,
  isFirstLogin: true,
  lastLogin: null,
  lastLoginAs: 'student',
  bookmarkedOffers: [],
  createdAt: '2023-03-07T07:59:04.615Z',
  updatedAt: '2023-03-07T07:59:04.615Z'
}

export const mockOfferAuthor = {
  _id: '63f905d3237ccffcf95d88da',
  role: ['student'],
  firstName: 'Tart',
  lastName: 'Drilling',
  photo:
    'https://media.npr.org/assets/img/2014/08/07/monkey-selfie_custom-7117031c832fc3607ee5b26b9d5b03d10a1deaca-s300-c85.webp',
  email: 'tartdrilling@gmail.com',
  categories: [],
  lastLogin: '2023-03-03T21:01:30.973Z',
  createdAt: '2023-02-24T18:45:39.298Z',
  updatedAt: '2023-03-03T21:01:30.975Z',
  __v: 0
}

export const mockOffer = {
  _id: '640092c8c729d4db9788d9d0',
  price: 15,
  proficiencyLevel: ['Beginner'],
  description: 'test description',
  languages: ['English'],
  authorRole: 'student',
  userId: '63f21d357a3b08831a22b257',
  subject: { _id: '63da8767c9ad4c9a0b0eacd3', name: 'English' },
  category: { _id: '63da8767c9ad4c9a0b0eacd3', name: 'Languages' },
  createdAt: '2023-03-02T12:12:56.598Z',
  updatedAt: '2023-03-02T12:12:56.598Z',
  __v: 0
}
