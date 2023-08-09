const itemsMock = Array.apply(10)
  .fill()
  .map((_, index) => ({
    _id: `${index}`,
    price: 1,
    proficiencyLevel: ['Beginner'],
    title: '11',
    description: 'test tes tes tes tes test',
    languages: ['English'],
    authorRole: 'student',
    author: {
      _id: `${index}`,
      firstName: 'Ілля',
      lastName: 'Наконечний',
      totalReviews: { student: 0, tutor: 0 },
      averageRating: { student: 0, tutor: 0 },
      nativeLanguage: 'Ukrainian',
      photo: '',
      professionalSummary: ''
    },
    subject: { _id: '64885108fdc2d1a130c24af9', name: 'Cybersecurity' },
    category: {
      _id: '64884f33fdc2d1a130c24ac2',
      appearance: { icon: 'mocked-path-to-icon', color: '#66C42C' }
    },
    status: 'active',
    FAQ: [],
    createdAt: '2023-07-30T11:01:20.785Z',
    updatedAt: '2023-07-31T14:10:14.867Z'
  }))

export const offersMock = {
  items: [
    {
      _id: '64cc01437b124cfa8bb57e0d',
      price: 250,
      proficiencyLevel: ['Intermediate'],
      title: 'Piano teaching ',
      description: 'Piano training is needed ',
      languages: ['Ukrainian', 'English'],
      authorRole: 'student',
      author: {
        _id: '64241ac11920ac9e56b79aef',
        firstName: 'Khrystyna',
        lastName: 'Pavlikovska',
        totalReviews: { student: 0, tutor: 0 },
        averageRating: { student: 0, tutor: 0 }
      },
      subject: { _id: '648850ddfdc2d1a130c24af3', name: 'Piano' },
      category: {
        _id: '64884f21fdc2d1a130c24ac0',
        appearance: { icon: 'mocked-path-to-icon', color: '#66C42C' }
      },
      status: 'active',
      FAQ: [],
      createdAt: '2023-08-03T19:34:27.647Z',
      updatedAt: '2023-08-03T19:34:27.647Z'
    },

    {
      _id: '64bc01f29bbe3a53a746be3e',
      price: 300,
      proficiencyLevel: ['Intermediate', 'Advanced'],
      title:
        'I desire to get a degree of proffessional specialist of cybersecurity',
      description:
        'I look for senior in cybersecurity who has a flexible working hours',
      languages: ['Ukrainian'],
      authorRole: 'student',
      author: {
        _id: '64b79d41d8ee5eae0897fb93',
        firstName: 'Anastasiia',
        lastName: 'Mashchenko',
        totalReviews: { student: 0, tutor: 0 },
        averageRating: { student: 0, tutor: 0 }
      },
      subject: { _id: '64885108fdc2d1a130c24af9', name: 'Cybersecurity' },
      category: {
        _id: '64884f33fdc2d1a130c24ac2',
        appearance: { icon: 'mocked-path-to-icon', color: '#66C42C' }
      },
      status: 'active',
      FAQ: [],
      createdAt: '2023-07-22T16:21:06.023Z',
      updatedAt: '2023-07-22T16:21:06.023Z'
    },
    ...itemsMock
  ],
  count: 12
}
