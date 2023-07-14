export const mockOffer = {
  _id: '6480c14f5ca047c53c2ab784',
  price: 55,
  proficiencyLevel: [
    'Beginner',
    'Intermediate',
    'Advanced',
    'Test Preparation',
    'Professional'
  ],
  title: 'test',
  description: 'testtesttesttesttesttesttesttest',
  languages: ['Ukrainian'],
  authorRole: 'tutor',
  author: {
    _id: '646cc4a87279bbecd5b52965',
    firstName: 'Test',
    lastName: 'Vader',
    totalReviews: {
      student: 2,
      tutor: 1
    },
    averageRating: {
      student: 3,
      tutor: 4.3
    }
  },
  subject: {
    _id: '6422dbc0823be47b41eeb8d9',
    name: 'Piano'
  },
  category: {
    _id: '6421ed8ed991d46a84721dfa',
    appearance: 'mocked-path-to-icon'
  },
  status: 'active',
  FAQ: [{ _id: '1', question: 'How much does it cost?', answer: '100$' }],
  createdAt: '2023-06-07T17:41:35.141Z',
  updatedAt: '2023-06-07T17:41:35.141Z'
}
