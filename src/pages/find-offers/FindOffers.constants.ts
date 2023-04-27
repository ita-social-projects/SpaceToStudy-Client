export const defaultFilters = {
  sort: 'createdAt',
  language: 'All languages',
  native: 'false',
  rating: '0',
  price: [150, 500],
  name: '',
  level: ''
}

export const mockOffer = {
  _id: 'id',
  authorAvgRating: 4.3,
  authorFirstName: 'James',
  authorLastName: 'Wilson',
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
  languages: ['Ukrainian', 'English'],
  author: {
    totalReviews: {
      student: 0,
      tutor: 0
    },
    photo:
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    professionalSummary:
      'Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology'
  },
  price: 100,
  isBookmarked: false,
  subject: {
    id: '12345',
    name: 'English'
  },
  proficiencyLevel: ['Beginner', 'Advanced']
}

export const mockOfferSquareCard = {
  id: 'id',
  photo:
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  rating: 4.3,
  firstName: 'Andrew',
  lastName: 'Wilson',
  bio: 'Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology Senior lecturer at the Department of German Philology and Translation Department of English Philology',
  description:
    'Hello. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which.',
  languages: ['Ukrainian', 'English'],
  price: 100,
  subject: 'English',
  proficiencyLevel: 'Beginner',
  totalReviews: 33,
  averageRating: 4.8
}
