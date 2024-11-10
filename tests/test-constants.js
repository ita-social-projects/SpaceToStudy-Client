export const cooperationMockData = {
  _id: '672fd85a48371231a70da39f',
  price: 500,
  proficiencyLevel: ['Beginner'],
  status: 'active',
  needAction: 'tutor',
  title: 'Cooperation title',
  initiator: { _id: '66fd88ddc84a281ab2f2de93', role: ['tutor'] },
  receiver: { _id: '66b0aecdadd1fe775238c7d5', role: ['student'] },
  offer: {
    _id: '66ec53d40d9d9983a9525421',
    author: {
      _id: '66a7abbab3168fa64a8f5af1',
      firstName: 'John',
      lastName: 'Doe',
      photo: '1726302583778-pexels-vanessa-garcia-6326377.jpg',
      professionalSummary: 'I have 5 years of experience',
      averageRating: { student: 0, tutor: 0 },
      totalReviews: { student: 0, tutor: 0 }
    }
  },
  description: 'Cooperation description',
  languages: ['English'],
  subject: { name: 'Web Development' },
  category: { appearance: { icon: 'StarRoundedIcon', color: '#607D8B' } },
  sections: [],
  user: {
    _id: '66fd88ddc84a281ab2f2de93',
    firstName: 'John',
    lastName: 'Doe',
    role: 'tutor'
  },
  createdAt: '2024-09-12T11:28:34.397Z',
  updatedAt: '2024-09-12T11:28:34.397Z'
}

export const mockedCooperations = {
  items: [
    {
      _id: '66ec53d40d9d9983a952541',
      title: 'Cooperation title',
      offer: '66ec53d40d9d9983a952542',
      subject: { name: 'Web Development' },
      category: { appearance: { icon: 'StarRoundedIcon', color: '#607D8B' } },
      description: 'Cooperation description',
      languages: ['English'],
      user: {
        _id: '6565f781b2b2c701e9183cb8',
        firstName: 'Jane',
        lastName: 'Doe',
        photo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
      },
      price: 1800,
      proficiencyLevel: ['Beginner'],
      status: 'pending',
      needAction: 'student',
      sections: []
    }
  ],
  count: 1
}
