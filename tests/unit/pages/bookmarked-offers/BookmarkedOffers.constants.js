const itemsMock = Array.from(Array(10).keys()).map((_, index) => ({
  _id: `${index}`,
  price: 200,
  proficiencyLevel: ['Beginner'],
  title: 'Test title',
  description: 'Test description',
  languages: ['Ukrainian'],
  authorRole: 'tutor',
  author: {
    _id: '66851369d6e4ad127ff98122',
    firstName: 'TestFirstName',
    lastName: 'TestLastName',
    totalReviews: { student: 0, tutor: 0 },
    averageRating: { student: 0, tutor: 0 },
    nativeLanguage: 'Ukrainian',
    status: { student: 'active', tutor: 'active', admin: 'active' },
    photo: '',
    professionalSummary: 'I am professional'
  },
  enrolledUsers: ['6658f6b793885febb491e07c'],
  subject: {
    _id: '66758c8959019cd05eb11a5b',
    name: 'Public Relations'
  },
  category: {
    _id: '64884f8efdc2d1a130c24ad2',
    name: 'Marketing',
    appearance: { color: '#CD3636', icon: 'CampaignIcon' }
  },
  status: 'active',
  FAQ: [],
  createdAt: '2024-07-09T09:04:55.570Z',
  updatedAt: '2024-07-09T09:06:05.009Z',
  chatId: null
}))

export const offersMock = [
  {
    _id: '66b0b110add1fe775238c8e7',
    price: 42,
    proficiencyLevel: ['Beginner'],
    title: 'Japanese for beginners',
    description:
      '日本語の基礎を学ぶ。ひらがな、カタカナ、簡単な会話などを習います。',
    languages: ['English', 'Japanese'],
    authorRole: 'tutor',
    author: {
      _id: '66a7abbab3168fa64a8f5af1',
      firstName: 'Hiroo',
      lastName: 'Onoda',
      totalReviews: { student: 0, tutor: 0 },
      averageRating: { student: 0, tutor: 0 },
      nativeLanguage: 'Japanese',
      status: { student: 'active', tutor: 'active', admin: 'active' },
      photo: '1722264676076-photo_2024-01-01 19.59.19.jpeg',
      professionalSummary: 'A tutor'
    },
    enrolledUsers: ['66b0aecdadd1fe775238c7d5'],
    subject: { _id: '6675859059019cd05eb11a04', name: 'Japanese' },
    category: {
      _id: '64884f21fdc2d1a130c24ac0',
      name: 'Languages',
      appearance: { color: '#6DC050', icon: 'LanguageIcon' }
    },
    status: 'active',
    FAQ: {
      question: 'My expertise',
      answer:
        '日本語能力試験対策、ビジネス日本語、会話など、生徒の目的に合わせたカリキュラムを作成し、高い合格率を達成。',
      _id: '66b0b110add1fe775238c8e8'
    },
    createdAt: '2024-08-05T11:01:36.434Z',
    updatedAt: '2024-08-05T11:02:34.791Z',
    chatId: '66c3196650962acb192acbe0'
  },
  {
    _id: '668cfd37f09bc26c91d95f57',
    price: 200,
    proficiencyLevel: ['Advanced', 'Test Preparation'],
    title: 'Public speach',
    description: 'Test description',
    languages: ['Ukrainian'],
    authorRole: 'tutor',
    author: {
      _id: '66851369d6e4ad127ff98122',
      firstName: 'Anastasiia',
      lastName: 'Matiushenko',
      totalReviews: { student: 0, tutor: 0 },
      averageRating: { student: 0, tutor: 0 },
      nativeLanguage: 'Ukrainian',
      status: { student: 'active', tutor: 'active', admin: 'active' },
      photo: '',
      professionalSummary: 'I am professional'
    },
    enrolledUsers: ['6658f6b793885febb491e07c'],
    subject: {
      _id: '66758c8959019cd05eb11a5b',
      name: 'Public Relations'
    },
    category: {
      _id: '64884f8efdc2d1a130c24ad2',
      name: 'Marketing',
      appearance: { color: '#CD3636', icon: 'CampaignIcon' }
    },
    status: 'active',
    FAQ: [],
    createdAt: '2024-07-09T09:04:55.570Z',
    updatedAt: '2024-07-09T09:06:05.009Z',
    chatId: null
  },
  ...itemsMock
]
